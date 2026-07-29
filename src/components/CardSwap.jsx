"use client";
import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, total) => ({
  x: 0,
  y: i * 25,
  z: i * -60,
  scale: 1 - (i * 0.05),
  opacity: 1 - (i * 0.15),
  zIndex: total - i
});

const placeNow = (el, slot) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    scale: slot.scale,
    opacity: slot.opacity,
    xPercent: -50,
    yPercent: -50,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  children
}) => {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, total)));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      // 1. Swipe front card UP and RIGHT to throw it out of the box
      tl.to(elFront, {
        x: 400,
        y: -200,
        rotation: 15,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      });

      // 2. Promote the rest of the cards up the deck
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, refs.length);
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            scale: slot.scale,
            opacity: slot.opacity,
            zIndex: slot.zIndex,
            duration: 0.6,
            ease: 'back.out(1.2)'
          },
          0.1
        );
      });

      // 3. Bring the old front card to the back of the deck
      const backSlot = makeSlot(refs.length - 1, refs.length);
      tl.set(elFront, { 
        x: 0, 
        y: backSlot.y + 100, 
        z: backSlot.z,
        scale: backSlot.scale,
        rotation: 0,
        zIndex: backSlot.zIndex 
      });
      tl.to(
        elFront,
        {
          y: backSlot.y,
          opacity: backSlot.opacity,
          duration: 0.5,
          ease: 'power2.out'
        },
        '>'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        if (node) {
          node.removeEventListener('mouseenter', pause);
          node.removeEventListener('mouseleave', resume);
        }
        clearInterval(intervalRef.current);
        tlRef.current?.kill();
      };
    }
    return () => {
      clearInterval(intervalRef.current);
      tlRef.current?.kill();
    };
  }, [delay, pauseOnHover]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;

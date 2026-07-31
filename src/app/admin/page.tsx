'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { signout } from '@/app/(marketing)/auth/actions';
import { Button } from '@/components/Button';
import { Moon, Sun, Plus, Save, Trash2, Edit, AlertCircle, RefreshCw, X, Eye, Activity, Users, FileText, Database, LogOut } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './admin.css';

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tests' | 'users' | 'responses' | 'articles' | 'settings'>('overview');
  const [filterModule, setFilterModule] = useState('all');
  
  // Data States
  const [tests, setTests] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  
  // Edit States
  const [editingTest, setEditingTest] = useState<any>(null);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState('');
  
  // Modal State
  const [selectedResponse, setSelectedResponse] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchData(activeTab);
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('admin-theme') || 'light';
      setTheme(savedTheme);
      document.body.setAttribute('data-theme', savedTheme);
    }
  }, [activeTab]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('admin-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const fetchData = async (tab: string) => {
    setLoading(true);
    
    // We fetch everything for the overview tab
    const fetchTests = supabase.from('tests').select('*').order('created_at', { ascending: false });
    const fetchUsers = supabase.from('profiles').select('*').eq('role', 'user').order('created_at', { ascending: false });
    const fetchResponses = supabase.from('user_responses').select('*, profiles(email), tests(title, type)').order('created_at', { ascending: false });
    const fetchArticles = supabase.from('articles').select('*').order('created_at', { ascending: false });

    if (tab === 'overview') {
      const [tRes, uRes, rRes, aRes] = await Promise.all([fetchTests, fetchUsers, fetchResponses, fetchArticles]);
      if (tRes.data) setTests(tRes.data);
      if (uRes.data) setUsers(uRes.data);
      if (rRes.data) setResponses(rRes.data);
      if (aRes.data) setArticles(aRes.data);
    } else if (tab === 'tests') {
      const { data, error } = await fetchTests;
      if (!error) setTests(data || []);
    } else if (tab === 'users') {
      const { data, error } = await fetchUsers;
      if (!error) setUsers(data || []);
    } else if (tab === 'responses') {
      const { data, error } = await fetchResponses;
      if (!error) setResponses(data || []);
    } else if (tab === 'articles') {
      const { data, error } = await fetchArticles;
      if (!error) setArticles(data || []);
    }
    setLoading(false);
  };

  // --- OVERVIEW DATA ---
  const responsesByModule = [
    { name: 'Reading', value: responses.filter(r => r.tests?.type === 'reading').length },
    { name: 'Listening', value: responses.filter(r => r.tests?.type === 'listening').length },
    { name: 'Writing', value: responses.filter(r => r.tests?.type === 'writing').length },
    { name: 'Speaking', value: responses.filter(r => r.tests?.type === 'speaking').length },
  ].filter(i => i.value > 0);

  const COLORS = ['#3498db', '#9b59b6', '#f39c12', '#e74c3c'];

  // --- TESTS LOGIC ---
  const handleSaveTest = async () => {
    setSaveStatus('Saving...');
    try {
      const parsedContent = typeof editingTest.content === 'string' 
        ? JSON.parse(editingTest.content) 
        : editingTest.content;
        
      const payload = { ...editingTest, content: parsedContent };

      if (editingTest.id === 'new') {
        const { id, ...newPayload } = payload;
        const { error } = await supabase.from('tests').insert([newPayload]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('tests').update(payload).eq('id', editingTest.id);
        if (error) throw error;
      }
      
      setSaveStatus('Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
      setEditingTest(null);
      fetchData('tests');
    } catch (err: any) {
      setSaveStatus(`Error: ${err.message}`);
    }
  };

  const handleDeleteTest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this test?')) return;
    const { error } = await supabase.from('tests').delete().eq('id', id);
    if (!error) fetchData('tests');
  };

  // --- USERS LOGIC ---

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Delete user profile? Note: This deletes the profile, not the auth user.')) return;
    const { error } = await supabase.from('profiles').delete().eq('id', userId);
    if (!error) fetchData('users');
  };

  return (
    <div className={`cms-container ${theme}`}>
      <aside className="cms-sidebar">
        <div className="cms-brand">
          <div className="brand-dot"></div>
          <h2>Intellify CMS</h2>
        </div>
        
        <nav className="cms-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview Analytics</button>
          <button className={`nav-item ${activeTab === 'tests' ? 'active' : ''}`} onClick={() => setActiveTab('tests')}>Tests Database</button>
          <button className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>User Management</button>
          <button className={`nav-item ${activeTab === 'responses' ? 'active' : ''}`} onClick={() => setActiveTab('responses')}>User Responses</button>
          <button className={`nav-item ${activeTab === 'articles' ? 'active' : ''}`} onClick={() => setActiveTab('articles')}>Articles & Resources</button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          <button className="theme-toggle" onClick={handleLogout} style={{ marginTop: '12px', color: 'var(--primary-red)' }}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="cms-main">
        <header className="cms-header">
          <h1>
            {activeTab === 'overview' && 'Overview Analytics'}
            {activeTab === 'tests' && 'Test Management'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'responses' && 'User Responses'}
            {activeTab === 'articles' && 'Articles & Resources'}
          </h1>
          {activeTab === 'tests' && !editingTest && (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <select 
                value={filterModule} 
                onChange={(e) => setFilterModule(e.target.value)}
                style={{ 
                  padding: '10px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--light-gray-border)', 
                  background: 'var(--pure-white)', 
                  color: 'var(--pure-black)',
                  fontWeight: 600,
                  fontSize: '14px',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Modules</option>
                <option value="reading">Reading</option>
                <option value="listening">Listening</option>
                <option value="writing">Writing</option>
                <option value="speaking">Speaking</option>
              </select>
              <Button variant="primary" onClick={() => setEditingTest({ id: 'new', type: 'reading', slug: 'passage-new', title: 'New Test', meta: '', content: JSON.stringify({}, null, 2) })} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--primary-red)' }}>
                <Plus size={16} /> Create Test
              </Button>
            </div>
          )}
        </header>

        {/* OVERVIEW VIEW */}
        {activeTab === 'overview' && (
          <div className="overview-view">
            {loading ? (
              <div className="loading-state">
                <RefreshCw className="spin" size={24} />
                <p>Loading analytics...</p>
              </div>
            ) : (
              <>
                <div className="dashboard-grid">
                  <div className="stat-card">
                    <h3><Users size={16} /> Total Users</h3>
                    <div className="stat-value">{users.length}</div>
                  </div>
                  <div className="stat-card">
                    <h3><Database size={16} /> Total Tests</h3>
                    <div className="stat-value">{tests.length}</div>
                  </div>
                  <div className="stat-card">
                    <h3><FileText size={16} /> Total Responses</h3>
                    <div className="stat-value">{responses.length}</div>
                  </div>
                </div>

                <div className="dashboard-charts">
                  <div className="chart-card">
                    <h3>Responses by Module</h3>
                    {responsesByModule.length > 0 ? (
                      <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                          <Pie data={responsesByModule} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                            {responsesByModule.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p style={{ color: 'var(--mid-gray)' }}>No responses yet.</p>
                    )}
                  </div>
                  <div className="chart-card">
                    <h3>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                      {responses.slice(0, 5).map(r => (
                        <div key={r.id} style={{ padding: '12px', border: '1px solid var(--light-gray-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <strong>{r.profiles?.email}</strong> completed <span>{r.tests?.title}</span>
                          </div>
                          <span style={{ color: 'var(--mid-gray)', fontSize: '13px' }}>
                            {new Date(r.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TESTS VIEW */}
        {activeTab === 'tests' && (
          editingTest ? (
            <div className="editor-view">
              <div className="editor-header">
                <h3>{editingTest.id === 'new' ? 'Create New Test' : 'Edit Test'}</h3>
                <div className="editor-actions">
                  <Button variant="ghost" onClick={() => setEditingTest(null)}>Cancel</Button>
                  <Button variant="primary" onClick={handleSaveTest} style={{ background: 'var(--success-color)' }}>
                    <Save size={16} style={{ marginRight: '6px' }} /> Save Changes
                  </Button>
                </div>
              </div>
              
              {saveStatus && (
                <div className={`status-banner ${saveStatus.includes('Error') ? 'error' : 'success'}`}>
                  <AlertCircle size={16} /> {saveStatus}
                </div>
              )}
              <div style={{ padding: '0 24px 16px', color: 'var(--mid-gray)', fontSize: '13px' }}>
                Note: Editing the Content (JSON) below will directly update the questions and passages shown to users in the practice modules.
              </div>

              <div className="editor-grid">
                <div className="form-group">
                  <label>Module Type</label>
                  <select value={editingTest.type} onChange={(e) => setEditingTest({...editingTest, type: e.target.value})}>
                    <option value="reading">Reading</option>
                    <option value="listening">Listening</option>
                    <option value="writing">Writing</option>
                    <option value="speaking">Speaking</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Slug (URL ID)</label>
                  <input type="text" value={editingTest.slug} onChange={(e) => setEditingTest({...editingTest, slug: e.target.value})} />
                </div>

                <div className="form-group full-width">
                  <label>Title</label>
                  <input type="text" value={editingTest.title} onChange={(e) => setEditingTest({...editingTest, title: e.target.value})} />
                </div>

                <div className="form-group full-width">
                  <label>Meta Details</label>
                  <input type="text" value={editingTest.meta} onChange={(e) => setEditingTest({...editingTest, meta: e.target.value})} />
                </div>

                <div className="form-group full-width">
                  <label>Content (JSON)</label>
                  <textarea 
                    className="json-editor"
                    value={typeof editingTest.content === 'string' ? editingTest.content : JSON.stringify(editingTest.content, null, 2)} 
                    onChange={(e) => setEditingTest({...editingTest, content: e.target.value})} 
                    rows={20}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="table-view">
              {loading ? (
                <div className="loading-state">
                  <RefreshCw className="spin" size={24} />
                  <p>Loading database...</p>
                </div>
              ) : (
                <table className="cms-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Module</th>
                      <th>Slug</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.filter(test => filterModule === 'all' || test.type === filterModule).map(test => (
                      <tr key={test.id}>
                        <td><strong>{test.title}</strong></td>
                        <td><span className={`badge badge-${test.type}`}>{test.type}</span></td>
                        <td><code>{test.slug}</code></td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn edit" onClick={() => setEditingTest(test)}><Edit size={16} /></button>
                            <button className="action-btn delete" onClick={() => handleDeleteTest(test.id)}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )
        )}

        {/* USERS VIEW */}
        {activeTab === 'users' && (
          <div className="table-view">
            {loading ? (
              <div className="loading-state">
                <RefreshCw className="spin" size={24} />
                <p>Loading users...</p>
              </div>
            ) : (
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td><strong>{u.email}</strong></td>
                      <td>{u.full_name || 'N/A'}</td>
                      <td><span className={`badge ${u.role === 'admin' ? 'badge-speaking' : 'badge-reading'}`}>{u.role}</span></td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn delete" onClick={() => handleDeleteUser(u.id)} title="Delete Profile"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* RESPONSES VIEW */}
        {activeTab === 'responses' && (
          <div className="table-view">
            {loading ? (
              <div className="loading-state">
                <RefreshCw className="spin" size={24} />
                <p>Loading responses...</p>
              </div>
            ) : (
              <table className="cms-table">
                <thead>
                  <tr>
                    <th>User Email</th>
                    <th>Test Module</th>
                    <th>Date Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map(r => {
                    const email = r.profiles?.email || 'Unknown User';
                    const testTitle = r.tests?.title || 'Unknown Test';
                    const moduleType = r.tests?.type || 'N/A';
                    const date = new Date(r.created_at).toLocaleString();
                    const snippet = JSON.stringify(r.answer_data).substring(0, 50) + '...';
                    
                    return (
                      <tr key={r.id}>
                        <td><strong>{email}</strong></td>
                        <td><span className={`badge badge-${moduleType}`}>{moduleType}</span> <br/> <small>{testTitle}</small></td>
                        <td>{date}</td>
                        <td>
                          <Button variant="ghost" onClick={() => setSelectedResponse({ ...r, email, testTitle, moduleType, date })} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <Eye size={16} /> View Full
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ARTICLES VIEW */}
        {activeTab === 'articles' && (
          editingArticle ? (
            <div className="editor-view">
              <div className="editor-header">
                <h3>{editingArticle.id === 'new' ? 'Create New Article' : 'Edit Article'}</h3>
                <div className="editor-actions">
                  <Button variant="ghost" onClick={() => setEditingArticle(null)}>Cancel</Button>
                  <Button variant="primary" onClick={async () => {
                    setSaveStatus('Saving...');
                    try {
                      const payload = { ...editingArticle };
                      if (payload.id === 'new') {
                        delete payload.id;
                        const { error } = await supabase.from('articles').insert([payload]);
                        if (error) throw error;
                      } else {
                        const { error } = await supabase.from('articles').update(payload).eq('id', payload.id);
                        if (error) throw error;
                      }
                      setSaveStatus('Saved successfully!');
                      setTimeout(() => setSaveStatus(''), 3000);
                      setEditingArticle(null);
                      fetchData('articles');
                    } catch (err: any) {
                      setSaveStatus(`Error: ${err.message}`);
                    }
                  }} style={{ background: 'var(--success-color)' }}>
                    <Save size={16} style={{ marginRight: '6px' }} /> Save Changes
                  </Button>
                </div>
              </div>
              
              {saveStatus && (
                <div className={`status-banner ${saveStatus.includes('Error') ? 'error' : 'success'}`}>
                  <AlertCircle size={16} /> {saveStatus}
                </div>
              )}

              <div className="editor-grid">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" value={editingArticle.title} onChange={e => setEditingArticle({...editingArticle, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Slug (URL path)</label>
                  <input type="text" value={editingArticle.slug} onChange={e => setEditingArticle({...editingArticle, slug: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" value={editingArticle.category || ''} onChange={e => setEditingArticle({...editingArticle, category: e.target.value})} />
                </div>
                <div className="form-group full-width">
                  <label>External URL (Optional)</label>
                  <input type="text" value={editingArticle.external_url || ''} placeholder="https://..." onChange={e => setEditingArticle({...editingArticle, external_url: e.target.value})} />
                </div>
                <div className="form-group full-width">
                  <label>Content (HTML / Text)</label>
                  <textarea 
                    className="json-editor" 
                    rows={15} 
                    value={editingArticle.content} 
                    onChange={e => setEditingArticle({...editingArticle, content: e.target.value})}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="table-view">
              <div style={{ padding: '24px', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid var(--light-gray-border)' }}>
                <Button variant="primary" onClick={() => setEditingArticle({ id: 'new', title: 'New Article', slug: 'new-article', category: 'General', content: '' })} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--primary-red)' }}>
                  <Plus size={16} /> Create Article
                </Button>
              </div>
              {loading ? (
                <div className="loading-state">
                  <RefreshCw className="spin" size={24} />
                  <p>Loading articles...</p>
                </div>
              ) : (
                <table className="cms-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Slug</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map(article => (
                      <tr key={article.id}>
                        <td><strong>{article.title}</strong></td>
                        <td><span className="badge badge-reading">{article.category}</span></td>
                        <td><code>{article.slug}</code></td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-btn edit" onClick={() => setEditingArticle(article)}><Edit size={16} /></button>
                            <button className="action-btn delete" onClick={async () => {
                              if (!confirm('Are you sure you want to delete this article?')) return;
                              const { error } = await supabase.from('articles').delete().eq('id', article.id);
                              if (!error) fetchData('articles');
                            }}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )
        )}

      </main>

      {/* Response Modal */}
      {selectedResponse && (
        <div className="modal-overlay" onClick={() => setSelectedResponse(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedResponse.testTitle}</h2>
                <span style={{ fontSize: '14px', color: 'var(--mid-gray)' }}>Submitted by {selectedResponse.email} on {selectedResponse.date}</span>
              </div>
              <button className="modal-close" onClick={() => setSelectedResponse(null)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <pre className="json-view">
                {JSON.stringify(selectedResponse.answer_data, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

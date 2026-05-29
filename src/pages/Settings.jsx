import { useState } from 'react';

const tabs = ['Profile', 'Security', 'Notifications', 'Appearance'];

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-[12.5px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-[11.5px] text-slate-400 dark:text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2.5 text-[13.5px] placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all ${className}`}
      {...props}
    />
  );
}

function Select({ children, ...props }) {
  return (
    <select
      className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-blue-500 transition-all"
      {...props}
    >
      {children}
    </select>
  );
}

function Toggle({ label, description, defaultChecked = false }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-slate-700/60 last:border-0">
      <div className="pr-4">
        <div className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{label}</div>
        {description && <div className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">{description}</div>}
      </div>
      <button
        onClick={() => setOn(v => !v)}
        role="switch"
        aria-checked={on}
        style={{ width: 38, height: 22, minWidth: 38 }}
        className={`relative rounded-full transition-colors duration-200 ${on ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-600'}`}
      >
        <span
          style={{ width: 18, height: 18 }}
          className={`absolute top-0.5 left-0.5 bg-white rounded-full shadow-sm transition-transform duration-200 ${on ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </button>
    </div>
  );
}

function Card({ title, description, children }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
      <div className="mb-5 pb-4 border-b border-slate-100 dark:border-slate-700">
        <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        {description && <p className="text-[12.5px] text-slate-400 dark:text-slate-500 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function SaveBar({ onSave }) {
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button className="text-[13px] font-medium px-5 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
      <button onClick={onSave} className="text-[13px] font-medium px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors">Save Changes</button>
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h2 className="text-[17px] font-semibold text-slate-800 dark:text-slate-100">Settings</h2>
        <p className="text-[12.5px] text-slate-400 dark:text-slate-500 mt-0.5">Manage your account and system preferences</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[13px] font-medium px-4 py-3 rounded-xl">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
          Settings saved successfully.
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-1.5 w-fit">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`text-[13px] font-medium px-4 py-2 rounded-lg transition-all ${activeTab === tab ? 'bg-slate-800 dark:bg-slate-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Profile */}
      {activeTab === 'Profile' && (
        <div className="space-y-4">
          <Card title="Profile Information" description="Update your personal details and public information.">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#1e2d45] dark:bg-slate-700 flex items-center justify-center text-white text-3xl font-bold shrink-0">S</div>
              <div>
                <div className="text-[13.5px] font-semibold text-slate-800 dark:text-slate-100 mb-0.5">Syedain Iqbal Shigri</div>
                <div className="text-[12px] text-slate-400 dark:text-slate-500 mb-3">Administrator · surmashigri@gmail.com</div>
                <button className="text-[12.5px] font-medium text-blue-500 border border-blue-200 dark:border-blue-500/30 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">Change Photo</button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name"><Input defaultValue="Syedain" /></Field>
              <Field label="Last Name"><Input defaultValue="Iqbal Shigri" /></Field>
              <Field label="Email Address"><Input type="email" defaultValue="surmashigri@gmail.com" /></Field>
              <Field label="Phone Number"><Input type="tel" defaultValue="+92-300-0000000" /></Field>
              <Field label="Role"><Input defaultValue="Administrator" disabled className="opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-800" /></Field>
              <Field label="Timezone">
                <Select>
                  <option>Asia/Karachi (PKT, UTC+5)</option>
                  <option>Asia/Dubai (GST, UTC+4)</option>
                  <option>Europe/London (GMT, UTC+0)</option>
                </Select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Bio" hint="Brief description for your profile.">
                  <textarea defaultValue="Admin of the TravelEase dashboard. Managing packages, bookings, and partner relationships."
                    rows={3} className="w-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2.5 text-[13.5px] resize-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder-slate-400" />
                </Field>
              </div>
            </div>
            <div className="mt-5"><SaveBar onSave={handleSave} /></div>
          </Card>
        </div>
      )}

      {/* Security */}
      {activeTab === 'Security' && (
        <div className="space-y-4">
          <Card title="Change Password" description="Ensure your account uses a strong, unique password.">
            <div className="space-y-4 max-w-md">
              <Field label="Current Password"><Input type="password" placeholder="Enter current password" /></Field>
              <Field label="New Password"><Input type="password" placeholder="Enter new password" /></Field>
              <Field label="Confirm New Password" hint="Minimum 8 characters."><Input type="password" placeholder="Confirm new password" /></Field>
            </div>
            <div className="mt-5"><SaveBar onSave={handleSave} /></div>
          </Card>

          <Card title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg mb-4">
              <div>
                <div className="text-[13.5px] font-medium text-slate-700 dark:text-slate-300">Authenticator App</div>
                <div className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">Use an app to generate one-time codes</div>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">Not Set Up</span>
            </div>
            <button className="text-[13px] font-medium text-white bg-slate-800 dark:bg-slate-600 hover:bg-slate-700 dark:hover:bg-slate-500 px-5 py-2.5 rounded-lg transition-colors">Set Up 2FA</button>
          </Card>

          <Card title="Active Sessions" description="Manage devices where you're currently logged in.">
            {[
              { device: 'Chrome on Windows 10', location: 'Lahore, Pakistan', time: 'Active now', current: true },
              { device: 'Safari on iPhone', location: 'Lahore, Pakistan', time: '2 hours ago', current: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between py-3.5 border-b border-slate-100 dark:border-slate-700/60 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" style={{width:18,height:18}}><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" /></svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-slate-700 dark:text-slate-300">{s.device}</div>
                    <div className="text-[12px] text-slate-400 dark:text-slate-500">{s.location} · {s.time}</div>
                  </div>
                </div>
                {s.current
                  ? <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Current</span>
                  : <button className="text-[12px] font-medium text-red-500 hover:text-red-600 transition-colors">Revoke</button>
                }
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'Notifications' && (
        <div className="space-y-4">
          <Card title="Email Notifications" description="Choose which emails you want to receive.">
            <Toggle label="New Booking" description="Get notified when a new booking is made" defaultChecked />
            <Toggle label="Booking Cancellation" description="Alerts when a booking is cancelled" defaultChecked />
            <Toggle label="New User Registration" description="When a new user signs up" defaultChecked />
            <Toggle label="New Review Submitted" description="When a customer submits a review" />
            <Toggle label="Partner Requests" description="New hotel or car partner applications" defaultChecked />
            <Toggle label="Low Revenue Alerts" description="When monthly revenue drops below threshold" />
          </Card>
          <Card title="In-App Notifications">
            <Toggle label="Custom Package Requests" description="When users submit custom package requests" defaultChecked />
            <Toggle label="Contact Messages" description="New messages from the contact form" defaultChecked />
            <Toggle label="Pending Reviews" description="Reviews awaiting moderation" defaultChecked />
            <Toggle label="System Alerts" description="Critical system and security alerts" defaultChecked />
          </Card>
          <SaveBar onSave={handleSave} />
        </div>
      )}

      {/* Appearance */}
      {activeTab === 'Appearance' && (
        <div className="space-y-4">
          <Card title="Theme" description="Customize the look and feel of the dashboard.">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { name: 'Light', desc: 'Clean light interface', preview: 'bg-slate-100' },
                { name: 'Dark', desc: 'Easy on the eyes', preview: 'bg-slate-800' },
                { name: 'System', desc: 'Follows OS setting', preview: 'bg-gradient-to-r from-slate-100 to-slate-800' },
              ].map((t, i) => (
                <div key={t.name} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${i === 0 ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'}`}>
                  <div className={`w-full h-14 rounded-lg mb-3 ${t.preview}`} />
                  <div className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">{t.name}</div>
                  <div className="text-[12px] text-slate-400 dark:text-slate-500">{t.desc}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Language & Region">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Language"><Select><option>English (US)</option><option>Urdu</option><option>Arabic</option></Select></Field>
              <Field label="Date Format"><Select><option>YYYY-MM-DD</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></Select></Field>
              <Field label="Currency"><Select><option>USD ($)</option><option>PKR (₨)</option><option>AED (د.إ)</option></Select></Field>
            </div>
            <div className="mt-5"><SaveBar onSave={handleSave} /></div>
          </Card>
        </div>
      )}
    </div>
  );
}

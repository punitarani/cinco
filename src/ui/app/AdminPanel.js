import { html, css, LitElement } from '../assets/lit-core-2.7.4.min.js';

export class AdminPanel extends LitElement {
    static styles = css`
        * {
            font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            cursor: default;
            user-select: none;
            box-sizing: border-box;
        }

        :host {
            display: block;
            width: 1000px;
            height: 750px;
            color: white;
            background: rgba(20, 20, 20, 0.95);
            border-radius: 12px;
            overflow: hidden;
            position: relative;
        }

        .panel-container {
            display: flex;
            height: 100%;
            width: 100%;
            position: relative;
        }

        .sidebar {
            width: 200px;
            background: rgba(10, 10, 10, 0.8);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            flex-direction: column;
            padding: 20px 0;
        }

        .sidebar-header {
            padding: 0 20px 20px 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 20px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
        }

        .logo-text h1 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: white;
        }

        .logo-text p {
            margin: 2px 0 0 0;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
        }

        .sidebar-nav {
            flex: 1;
            padding: 0 20px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            margin: 4px 0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
        }

        .nav-item:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }

        .nav-item.active {
            background: rgba(99, 102, 241, 0.2);
            color: #818cf8;
            border: 1px solid rgba(99, 102, 241, 0.3);
        }

        .nav-icon {
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .content-header {
            padding: 20px 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.2);
        }

        .content-title {
            margin: 0 0 8px 0;
            font-size: 24px;
            font-weight: 600;
            color: white;
        }

        .content-subtitle {
            margin: 0;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
        }

        .content-body {
            flex: 1;
            padding: 30px;
            overflow-y: auto;
        }

        .content-body::-webkit-scrollbar {
            width: 6px;
        }

        .content-body::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
        }

        .content-body::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
        }

        .close-button {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 32px;
            height: 32px;
            border: none;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            z-index: 10;
        }

        .close-button:hover {
            background: rgba(255, 59, 48, 0.2);
            color: #ff453a;
        }

        /* Settings Page Styles */
        .settings-form {
            max-width: 500px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 500;
            color: white;
        }

        .form-input {
            width: 100%;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: white;
            font-size: 14px;
            transition: all 0.2s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: #818cf8;
            box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.1);
        }

        .form-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }

        .form-description {
            margin-top: 6px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-primary {
            background: #6366f1;
            color: white;
        }

        .btn-primary:hover {
            background: #5855eb;
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .current-status {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
        }

        .current-status h3 {
            margin: 0 0 8px 0;
            color: #4ade80;
            font-size: 16px;
        }

        .current-status p {
            margin: 0;
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
        }

        .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 400px;
            text-align: center;
        }

        .empty-state-icon {
            width: 64px;
            height: 64px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            font-size: 24px;
            color: rgba(255, 255, 255, 0.5);
        }

        .empty-state h3 {
            margin: 0 0 8px 0;
            font-size: 20px;
            color: white;
        }

        .empty-state p {
            margin: 0;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
        }
    `;

    static properties = {
        currentView: { type: String },
        apiKey: { type: String, state: true },
        isLoading: { type: Boolean, state: true },
    };

    constructor() {
        super();
        this.currentView = 'patients';
        this.apiKey = '';
        this.isLoading = false;
        this.loadCurrentApiKey();
    }

    async loadCurrentApiKey() {
        try {
            const keys = await window.api?.settingsView?.getAllKeys();
            if (keys?.openai) {
                this.apiKey = keys.openai;
            }
        } catch (error) {
            console.error('Failed to load current API key:', error);
        }
    }

    handleNavClick(view) {
        this.currentView = view;
    }

    handleClose() {
        if (window.api?.mainHeader?.hideAdminPanel) {
            window.api.mainHeader.hideAdminPanel();
            // Also notify that the panel is closed
            window.dispatchEvent(new CustomEvent('admin-panel-closed'));
        }
    }

    async handleSaveApiKey() {
        if (!this.apiKey.trim()) return;

        this.isLoading = true;
        try {
            const result = await window.api?.settingsView?.validateKey({
                provider: 'openai',
                key: this.apiKey,
            });

            if (result?.success) {
                // Show success feedback
                console.log('API key saved successfully');
            } else {
                console.error('Failed to save API key:', result?.error);
            }
        } catch (error) {
            console.error('Error saving API key:', error);
        } finally {
            this.isLoading = false;
        }
    }

    handleApiKeyInput(e) {
        this.apiKey = e.target.value;
    }

    renderNavItem(id, icon, label) {
        return html`
            <div 
                class="nav-item ${this.currentView === id ? 'active' : ''}"
                @click=${() => this.handleNavClick(id)}
            >
                <div class="nav-icon">${icon}</div>
                <span>${label}</span>
            </div>
        `;
    }

    renderPatientsContent() {
        return html`
            <div class="content-header">
                <h1 class="content-title">Patients</h1>
                <p class="content-subtitle">Manage patient records and information</p>
            </div>
            <div class="content-body">
                <div class="empty-state">
                    <div class="empty-state-icon">👥</div>
                    <h3>No patients yet</h3>
                    <p>Patient management features will be implemented here</p>
                </div>
            </div>
        `;
    }

    renderClaimsContent() {
        return html`
            <div class="content-header">
                <h1 class="content-title">Claims</h1>
                <p class="content-subtitle">Process and manage insurance claims</p>
            </div>
            <div class="content-body">
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <h3>No claims to display</h3>
                    <p>Claims management features will be implemented here</p>
                </div>
            </div>
        `;
    }

    renderSettingsContent() {
        return html`
            <div class="content-header">
                <h1 class="content-title">Settings</h1>
                <p class="content-subtitle">Configure your AI assistant</p>
            </div>
            <div class="content-body">
                <div class="settings-form">
                    ${
                        this.apiKey
                            ? html`
                        <div class="current-status">
                            <h3>✅ OpenAI Connected</h3>
                            <p>Your OpenAI API key is configured and ready to use.</p>
                        </div>
                    `
                            : ''
                    }
                    
                    <div class="form-group">
                        <label class="form-label" for="openai-key">
                            OpenAI API Key
                        </label>
                        <input 
                            type="password"
                            id="openai-key"
                            class="form-input"
                            placeholder="sk-..."
                            .value=${this.apiKey}
                            @input=${this.handleApiKeyInput}
                        />
                        <div class="form-description">
                            Your API key is stored securely and only used for AI requests.
                        </div>
                    </div>

                    <div style="display: flex; gap: 12px;">
                        <button 
                            class="btn btn-primary"
                            @click=${this.handleSaveApiKey}
                            ?disabled=${this.isLoading || !this.apiKey.trim()}
                        >
                            ${this.isLoading ? 'Saving...' : 'Save API Key'}
                        </button>
                        
                        ${
                            this.apiKey
                                ? html`
                            <button 
                                class="btn btn-secondary"
                                @click=${() => {
                                    this.apiKey = '';
                                    this.handleSaveApiKey();
                                }}
                            >
                                Clear
                            </button>
                        `
                                : ''
                        }
                    </div>
                </div>
            </div>
        `;
    }

    renderContent() {
        switch (this.currentView) {
            case 'patients':
                return this.renderPatientsContent();
            case 'claims':
                return this.renderClaimsContent();
            case 'settings':
                return this.renderSettingsContent();
            default:
                return this.renderPatientsContent();
        }
    }

    render() {
        return html`
            <div class="panel-container">
                <div class="sidebar">
                    <div class="sidebar-header">
                        <div class="logo">
                            <div class="logo-icon">C</div>
                            <div class="logo-text">
                                <h1>Cinco</h1>
                                <p>Assistant</p>
                            </div>
                        </div>
                    </div>
                    
                    <nav class="sidebar-nav">
                        ${this.renderNavItem(
                            'patients',
                            html`
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        `,
                            'Patients'
                        )}
                        
                        ${this.renderNavItem(
                            'claims',
                            html`
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                        `,
                            'Claims'
                        )}
                        
                        ${this.renderNavItem(
                            'settings',
                            html`
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                            </svg>
                        `,
                            'Settings'
                        )}
                    </nav>
                </div>

                <div class="main-content">
                    ${this.renderContent()}
                </div>

                <button class="close-button" @click=${this.handleClose}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `;
    }
}

customElements.define('admin-panel', AdminPanel);

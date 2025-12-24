import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import Button from '../components/ui/Button';

const Error500Page = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a1a', // Hardcoded dark bg to ensure scary look
            color: '#ff4444',
            textAlign: 'center',
            fontFamily: 'monospace'
        }}>
            <AlertTriangle size={80} style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '4rem', margin: 0 }}>500</h1>
            <h2 style={{ fontSize: '2rem', marginTop: '10px' }}>INTERNAL SERVER ERROR</h2>

            <div style={{
                margin: '40px 0',
                padding: '20px',
                background: 'rgba(255, 68, 68, 0.1)',
                border: '1px solid #ff4444',
                borderRadius: '8px',
                maxWidth: '600px'
            }}>
                <p style={{ margin: 0 }}>
                    CRITICAL FAILURE: The backend service detected an unhandled exception in the Circuit Breaker logic.
                    <br /><br />
                    Trace ID: {Math.random().toString(36).substring(7).toUpperCase()}
                </p>
            </div>

            <Button onClick={() => navigate('/')} variant="secondary">
                <Home size={18} /> Return to Safety
            </Button>
        </div>
    );
};

export default Error500Page;

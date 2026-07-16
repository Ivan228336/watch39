'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, message } from 'antd';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      message.error('Доступ запрещен');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
      <Input.Password 
        style={{ width: 300, marginBottom: 10 }}
        onChange={(e) => setPassword(e.target.value)} 
      />
      <Button type="primary" onClick={handleLogin}>Войти</Button>
    </div>
  );
}
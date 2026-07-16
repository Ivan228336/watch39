'use client';
import { useState } from 'react';
import { Button, Input, message } from 'antd';

export default function Login() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // РАДИКАЛЬНЫЙ РЕДИРЕКТ
        // Это заставит браузер полностью перезагрузить страницу
        // и заново пройти через наш proxy.ts (middleware)
        window.location.assign('/admin');
      } else {
        message.error('Неверный пароль');
      }
    } catch (err) {
      message.error('Ошибка сервера');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
      <Input.Password 
        style={{ width: 300, marginBottom: 10 }}
        onChange={(e) => setPassword(e.target.value)} 
        onPressEnter={handleLogin}
      />
      <Button type="primary" loading={loading} onClick={handleLogin}>
        Войти
      </Button>
    </div>
  );
}
export async function fetchAnalyticsData() {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  }
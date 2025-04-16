const auth = () => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
}

export default auth
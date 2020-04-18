import React from 'react';

import { useStore } from '~/context/store';


const AdminHome = () => {
  const [user] = useStore('user');
  return (
    <div className="mt-3">
      welcome, <a href={user.data.url}>{user.data.screen_name}</a>
    </div>
  );
};

export default AdminHome;

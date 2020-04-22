import React from 'react';

import { useStore } from '~/context/store';


const AdminHome = () => {
  const [user] = useStore('user');
  return (
    <div className="row mt-3">
      <div className="col-lg-6">
        <p>welcome, <a href={user.data.url}>{user.data.screen_name}</a></p>
        <p>
          planned light account management functionality still under
          construction; watch this space for updates. hit the DMs with
          any questions or concerns.
        </p>
        <p>
          - <a href="https://twitter.com/GhostOfJohnGode">@GhostOfJohnGode</a>
        </p>
      </div>
    </div>
  );
};

export default AdminHome;

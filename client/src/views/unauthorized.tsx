import React from 'react';


const Unauthorized: React.FC = () => {
  const robIdx = Math.floor(Math.random() * Math.floor(3)) + 1;
  const robPath = `/timelord-block-${robIdx}.jpg`;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <img src={robPath} className="w-100 mt-lg-3" />
          <h2 className="mt-3">REJECTED</h2>
          <p>
            Either something went wrong with the authentication process or your
            Twitter account isn't whitelisted for administrator access. If you'd
            like to be whitelisted, please contact ya boy (if you're here, you
            probably know where to find me) and I'll see about it.
          </p>
          <p>
            If you believe you're already whitelisted and you still ended up here,
            that probably means I broke something... so please also let me know
            if that happens ☘️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

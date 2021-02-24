const Center = ({ children }) => (
  <div className='center'>
    {children}
    <style jsx>{`
      .center {
        padding: 100px;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      }
    `}</style>
  </div>
);

export default Center;

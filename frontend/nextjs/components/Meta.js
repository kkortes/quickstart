import Head from 'next/head';
import Notifications from './Notifications';

export default ({ children }) => (
  <>
    <Head>
      <title>Quickstart</title>
      <link
        rel='shortcut icon'
        type='image/x-icon'
        href='/static/favicon.ico'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Bree+Serif|Fira+Sans+Condensed|Volkhov&display=swap'
        rel='stylesheet'
      />
      <link href='./static/icomoon/style.css' rel='stylesheet' />
    </Head>
    <div id='content'>{children}</div>
    <Notifications />

    <style jsx>
      {`
        #__next {
          display: flex;
          flex: 1;
          width: 100%;
          overflow: hidden;
        }
        #content {
          position: relative;
          display: flex;
          flex: 1;
          flex-direction: column;
          overflow-y: scroll;
          overflow-x: hidden;
          padding: 20px 15px 90px 15px;
          padding-bottom: 250px;
          overflow: hidden;
        }
      `}
    </style>
    <style jsx global>
      {`
        html,
        body {
          margin: 0;
          overflow: hidden;
          height: 100%;
        }
        html {
          font-size: 62.5%;
          -webkit-font-smoothing: antialiased;
        }
        body {
          font-family: 'Fira Sans Condensed', sans-serif;
          font-size: 1.6rem;
          line-height: 2rem;
          color: #444;
          background-color: black;
        }
        *::-webkit-scrollbar {
          width: 10px;
        }
        *::-webkit-scrollbar-thumb {
          background-color: #3f3f3f;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        #__next {
          height: 100%;
          overflow: hidden;
          display: flex;
          flex: 1;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
        img {
          max-width: 100%;
        }
        a {
          color: #1eadfa;
          text-decoration: none;
        }
        * {
          user-select: none;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-top: 0;
          margin-bottom: 4px;
          font-size: 1.6rem;
          line-height: 1.6rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        h1 {
          margin-bottom: 20px;
          font-size: 30px;
          line-height: 30px;
          text-align: center;
          letter-spacing: 3px;
        }
      `}
    </style>
  </>
);

import React, { Suspense } from 'react';
import axios from 'axios';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./Foo'),
  loading: () => <div>Loading..</div>
});

const LazyZoo = React.lazy(() => import('./Zoo'));

class TestAsync extends React.Component {
  state = {
    CaptainKirkBio: {},
    Foo: null
  };

  componentDidMount() {
    console.log('componentDidMount');
    this.onGetKirkBio();
    // import(/* webpackChunkName: 'Bar' */ './Bar').then(Bar => {
    //   this.setState({ Bar: Bar.default });
    // });
  }

  onGetKirkBio = async () => {
    try {
      const result = await axios({
        url: 'http://stapi.co/api/v1/rest/character/search',
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          title: 'James T. Kirk',
          name: 'James T. Kirk'
        }
      });
      const resultJSON = await result.data();
      const character = resultJSON.characters[0];
      this.setState({ CaptainKirkBio: character });
    } catch (error) {
      console.log('error', error);
    }
  };

  render() {
    console.log('render');
    const { CaptainKirkBio, Foo } = this.state;
    return (
      <div className="app">
        <img
          alt="header"
          src="/dist/images/header.jpg"
          className="app-header"
        />
        <p>
          We are a most promising species, Mr. Spock, as predators go. Did you
          know that? I frequently have my doubts. I dont. Not any more. And
          maybe in a thousand years or so, we will be able to prove it.
        </p>
        <p>- Captain Kirk</p>
        <section>
          {Object.values(CaptainKirkBio).length === 0 ? (
            <p>Loading User Information</p>
          ) : (
            <p style={{ wordBreak: 'break-all' }}>
              {JSON.stringify(CaptainKirkBio)}
            </p>
          )}
        </section>
        {/* {Bar ? <Bar /> : <p>Bar is loading</p>} */}
        <LoadableComponent />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyZoo />
        </Suspense>
      </div>
    );
  }
}

export default TestAsync;

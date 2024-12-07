import YouTube ,{YouTubeProps} from 'react-youtube';
import bgmUrls from "./dummyBgms"
import effectUrls from "./dummyEffetcts"
import { useState } from 'react';
import dummyBgms from './dummyBgms';

const BGMs = () => {

  let effectUrl = effectUrls[0]
  const [bgmUrl, setBgmData] = useState(dummyBgms[Math.floor(Math.random() * bgmUrls.length)])
  let playedBgms = []

  const onBgmReady : YouTubeProps["onReady"] = (event) => {

    event.target.playVideo()
    console.log("BGM start!!")
  };

  const onBgmEnd : YouTubeProps["onEnd"] = (event) => {

    playedBgms.push(bgmUrl);
    console.log(playedBgms);

    let setUrl = bgmUrls[Math.floor(Math.random() * bgmUrls.length)];

    while (playedBgms.includes(setUrl)){

      setUrl = bgmUrls[Math.floor(Math.random() * bgmUrls.length)];

      if (playedBgms.length === bgmUrls.length){
        playedBgms.splice(0)
      }
    }

    setBgmData(setUrl);
  };

  const onStateChange : YouTubeProps["onStateChange"] = (event) => {

    if (!(event.data === YouTube.PlayerState.PLAYING || event.data === YouTube.PlayerState.PAUSED)){
      event.target.playVideo();
    }
  }

  const onEffectReady : YouTubeProps["onReady"] = (event) => {
    event.target.playVideo();
    console.log("Effect start");
  };

  const onEffectEnd : YouTubeProps["onEnd"] = (event) => {

    event.target.seekTo(0, true);
  }
  

  const bgmOpts = {
    height: '390',
    width: '640',
    playerVars: {
      fs: 0,
      autoplay: 0,
      disablekb: 1,
      color: "white"
    }
  }

  const effectOpts = {
    height: '390',
    width: '640',
    playerVars: {
      loop: 1,
      fs: 0,
      autoplay: 0,
      disablekb: 1,
      color: "white"
    }
  }

  return (
    <div>
      <div className='BGMs'>
        <div className='BGM'>
          <YouTube videoId={ bgmUrl } opts={bgmOpts} onReady={onBgmReady} onStateChange={onStateChange} onEnd={onBgmEnd} />
        </div>
        <div className='BGM'>
          <YouTube videoId={ effectUrl } opts={effectOpts} onReady={onEffectReady} onEnd={onEffectEnd}/>
        </div>
      </div>
    </div>
  );
};

export default BGMs;
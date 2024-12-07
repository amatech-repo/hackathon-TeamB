import YouTube ,{YouTubeEvent, YouTubePlayer, YouTubeProps} from 'react-youtube';
import bgmUrls from "./dummyBgms"
import effectUrls from "./dummyEffetcts"
import { useState, useRef } from 'react';
import dummyBgms from './dummyBgms';

const BGMs = () => {

  let playedBgms = [];

  let effectUrl = effectUrls[0]

  const [bgmUrl, setBgmData] = useState(dummyBgms[Math.floor(Math.random() * bgmUrls.length)])
  const [bgmVolume, setBgmVolume] = useState(50);
  const [effectVolume, setEffectVolume] = useState(50);

  const bgmRef: React.MutableRefObject<YouTubePlayer> = useRef(null);
  const effectRef: React.MutableRefObject<YouTubePlayer> = useRef(null);

  const onBgmReady : YouTubeProps["onReady"] = (event:YouTubeEvent) => {

    event.target.playVideo();
    console.log("BGM start!!");
    event.target.setVolume(bgmVolume);

    bgmRef.current = event.target;
  };

  const onBgmEnd : YouTubeProps["onEnd"] = (_event) => {

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

  const onEffectReady : YouTubeProps["onReady"] = (event:YouTubeEvent) => {
    event.target.playVideo();
    console.log("Effect start");
    event.target.setVolume(effectVolume);

    effectRef.current = event.target;
  };

  const onEffectEnd : YouTubeProps["onEnd"] = (event) => {

    event.target.seekTo(0, true);
  }

  const onBgmHandleChange = (event:React.ChangeEvent<HTMLInputElement>)  => {
    const newVolume = parseInt(event.target.value, 10);
    setBgmVolume(newVolume);

    if (bgmRef.current){
      bgmRef.current.setVolume(newVolume);
    }
  }

  const onEffectHandleChange = (event:React.ChangeEvent<HTMLInputElement>)  => {
    const newVolume = parseInt(event.target.value, 10);
    setEffectVolume(newVolume);

    if (effectRef.current){
      effectRef.current.setVolume(newVolume);
    }
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
          <YouTube videoId={ bgmUrl } opts={bgmOpts} onReady={(e:YouTubeEvent)=>onBgmReady(e)} onStateChange={onStateChange} onEnd={onBgmEnd} />
          <input
          id="volume"
          type="range"
          min="0"
          max="100"
          value={bgmVolume}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onBgmHandleChange(e)}
          style={{ width: "100%" }}
        />
        </div>
        <div className='BGM'>
          <YouTube videoId={ effectUrl } opts={effectOpts} onReady={onEffectReady} onEnd={onEffectEnd}/>
          <input
          id="volume"
          type="range"
          min="0"
          max="100"
          value={effectVolume}
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>onEffectHandleChange(e)}
          style={{ width: "100%" }}
        />
        </div>
      </div>
    </div>
  );
};

export default BGMs;
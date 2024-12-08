import React, { useState, useRef } from "react";
import YouTube, {
  YouTubeEvent,
  YouTubePlayer,
  YouTubeProps,
} from "react-youtube";
import bgmUrls from "./dummyBgms";
import effectUrls from "./dummyEffetcts";
import dummyBgms from "./dummyBgms";
import CommentGet from "../../components/screen/CommentGet";

const BGMs = () => {
  let playedBgms = [];

  let effectUrl = effectUrls[0];

  const [bgmUrl, setBgmData] = useState(
    dummyBgms[Math.floor(Math.random() * bgmUrls.length)]
  );
  const [bgmVolume, setBgmVolume] = useState(50);
  const [effectVolume, setEffectVolume] = useState(50);

  const bgmRef: React.MutableRefObject<YouTubePlayer> = useRef(null);
  const effectRef: React.MutableRefObject<YouTubePlayer> = useRef(null);

  const onBgmReady: YouTubeProps["onReady"] = (event: YouTubeEvent) => {
    event.target.playVideo();
    console.log("BGM start!!");
    event.target.setVolume(bgmVolume);

    bgmRef.current = event.target;
  };

  const onBgmEnd: YouTubeProps["onEnd"] = (_event) => {
    playedBgms.push(bgmUrl);
    console.log(playedBgms);

    let setUrl = bgmUrls[Math.floor(Math.random() * bgmUrls.length)];

    while (playedBgms.includes(setUrl)) {
      setUrl = bgmUrls[Math.floor(Math.random() * bgmUrls.length)];

      if (playedBgms.length === bgmUrls.length) {
        playedBgms.splice(0);
      }
    }

    setBgmData(setUrl);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (
      !(
        event.data === YouTube.PlayerState.PLAYING ||
        event.data === YouTube.PlayerState.PAUSED
      )
    ) {
      event.target.playVideo();
    }
  };

  const onEffectReady: YouTubeProps["onReady"] = (event: YouTubeEvent) => {
    event.target.playVideo();
    console.log("Effect start");
    event.target.setVolume(effectVolume);

    effectRef.current = event.target;
  };

  const onEffectEnd: YouTubeProps["onEnd"] = (event) => {
    event.target.seekTo(0, true);
  };

  const onBgmHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setBgmVolume(newVolume);

    if (bgmRef.current) {
      bgmRef.current.setVolume(newVolume);
    }
  };

  const onEffectHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setEffectVolume(newVolume);

    if (effectRef.current) {
      effectRef.current.setVolume(newVolume);
    }
  };

  const bgmOpts = {
    playerVars: {
      fs: 0,
      autoplay: 0,
      disablekb: 1,
      color: "white",
    },
  };
  // height: "390",
  // width: "640",
  const effectOpts = {
    playerVars: {
      loop: 1,
      fs: 0,
      autoplay: 0,
      disablekb: 1,
      color: "white",
    },
  };

  return (
    <div className="relative">
      {/* コメント表示 */}
      <div className="absolute top-0 left-0 w-full">
        <CommentGet />
      </div>

      {/* メインコンテンツエリア */}
      <div className="absolute z-[-1] flex w-full p-32">
        {/* 左側 BGM プレイヤーセクション */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col w-full">
          <YouTube
            videoId={bgmUrl}
            // opts で width, height を指定しない
            opts={bgmOpts}
            onReady={(e: YouTubeEvent) => onBgmReady(e)}
            onStateChange={onStateChange}
            onEnd={onBgmEnd}
            iframeClassName="w-full h-full"
            className="w-full aspect-[640/360]"
          />
          <input
            id="volume"
            type="range"
            min="0"
            max="100"
            value={bgmVolume}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onBgmHandleChange(e)
            }
            className="mt-4 w-full"
          />
        </div>

        {/* 右側 エフェクトプレイヤーセクション（中央揃え） */}
        <div className="flex-1 items-center justify-center hidden">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col items-center">
            <YouTube
              videoId={effectUrl}
              opts={effectOpts}
              onReady={onEffectReady}
              onEnd={onEffectEnd}
            />
            <input
              id="volume"
              type="range"
              min="0"
              max="100"
              value={effectVolume}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onEffectHandleChange(e)
              }
              className="mt-4 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BGMs;

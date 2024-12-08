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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { contours } from "d3";

const BGMs = () => {
  let playedBgms = [];

  const [bgmUrl, setBgmData] = useState(
    bgmUrls[Math.floor(Math.random() * bgmUrls.length)]
  );
  const [effectUrl, setEffectData] = useState(effectUrls[0]);
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

  const onBgmEnd: YouTubeProps["onEnd"] = (_event) => onBgmChange()

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

  const onBgmChange = () => {
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
  }

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
  const onFinishTask = () => {
    window.location.href = "./";
  }



  const bgmOpts = {
    playerVars: {
      fs: 0,
      autoplay: 0,
      disablekb: 1,
      color: "white",
      controls :0
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
    <div className="flex flex-col p-16 max-w-full mx-auto">
      {/* メインコンテンツエリア */}
      <div className="w-full mx-auto">
        {/* 左側 BGM プレイヤーセクション */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col w-4/5 mx-auto">
          
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

          <div className="flex justfy-between max-md:inline-block mt-4">
          <Drawer>
            <DrawerTrigger>
              <Button className="mx-2"><img src="public/menu_24dp_D9D9D9_FILL0_wght400_GRAD0_opsz24.svg" alt="menu" className="w-10 h-10"/></Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>環境音変更</DrawerTitle>
                <DrawerDescription>
                  環境音の種類と音量を設定できます。
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex w-4/12 mx-auto justify-between">
                <Button onClick={() => {setEffectData(effectUrls[0])}}>なし</Button>
                <Button onClick={() => {setEffectData(effectUrls[1])}}>雨音</Button>
                <Button onClick={() => {setEffectData(effectUrls[2])}}>焚き火</Button>
                <Button onClick={() => {setEffectData(effectUrls[3])}}>雑踏</Button>
              </div>

              <label className="w-4/5 mx-auto">環境音の音量調節</label>
              <input
                id="volume"
                type="range"
                min="0"
                max="100"
                value={effectVolume}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onEffectHandleChange(e)
                }
                className="w-4/5 mx-auto"
              />
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">閉じる</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
            <input
            id="volume"
            type="range"
            min="0"
            max="100"
            value={bgmVolume}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onBgmHandleChange(e)
            }
            className="w-full h-1 mt-4"
          />
          <div className="flex justly-center">
            <Button onClick={onBgmChange} className="mx-2"><img src="public/skip_next_24dp_D9D9D9_FILL0_wght400_GRAD0_opsz24.svg" alt="skip" className="w-10 h-10"/></Button>
            <Button onClick={onFinishTask} className="mx-2"><img src="public/home_24dp_D9D9D9_FILL0_wght400_GRAD0_opsz24.svg" alt="home" className="w-10 h-10"/></Button>
          </div>
          
          </div>
          
        </div>
        {/* 右側 エフェクトプレイヤーセクション（中央揃え） */}
        <div className="hidden">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col w-4/5">
            <YouTube
              videoId={effectUrl}
              opts={effectOpts}
              onReady={onEffectReady}
              onStateChange={onStateChange}
              onEnd={onEffectEnd}
              iframeClassName="w-full h-full"
              className="w-full aspect-[640/360]"
            />
          </div>
        </div>

        {/* コメント表示 */}
        <div className="w-4/5">
          <CommentGet />
        </div>
        <div className="mx-auto w-fit">
          
        </div>
      </div>
    </div>
  );
};

export default BGMs;

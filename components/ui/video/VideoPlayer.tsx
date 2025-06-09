import React, { useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  onLoadedData?: (video: HTMLVideoElement) => void; // 添加这个属性
}

const VideoPlayer = ({
  src,
  poster,
  className = '',
  autoPlay = false,
  controls = true,
  muted = false,
  loop = false,
  onLoadedData, // 添加这个参数
}: VideoPlayerProps ) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    if (!controls) {
      togglePlay();
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        controls={controls}
        muted={muted}
        loop={loop}
        className="w-full h-full object-cover rounded-lg"
        onClick={handleVideoClick}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onLoadedData={() => onLoadedData?.(videoRef.current!)} // 添加这行
      >
        您的浏览器不支持视频播放。
      </video>
      
      {/* 自定义播放按钮覆盖层 */}
      {!controls && (
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg transition-opacity duration-300 ${
            isPlaying && !showControls ? 'opacity-0' : 'opacity-100'
          } group-hover:opacity-100 cursor-pointer`}
          onClick={togglePlay}
        >
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-opacity-30 transition-all duration-200">
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
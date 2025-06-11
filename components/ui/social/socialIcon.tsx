import {
  FaInstagram, 
  FaTwitter, 
  FaFacebookF, 
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaWeixin,
  FaLine,
  FaLink
} from 'react-icons/fa';
import { SiXiaohongshu } from 'react-icons/si';

type Platform = 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'youtube' | 'tiktok' | 'douyin' | 'wechat' | 'line' | 'xiaohongshu';

interface SocialIconProps {
  url: string;
  platform?: Platform;
  size?: number;
  className?: string;
  showLabel?: boolean;
}

const platformIcons = {
  instagram: FaInstagram,
  twitter: FaTwitter,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  douyin: FaTiktok, // 抖音使用TikTok图标
  wechat: FaWeixin,
  line: FaLine,
  xiaohongshu: SiXiaohongshu
};

const platformColors = {
  instagram: 'from-purple-500 via-pink-500 to-orange-400',
  twitter: 'bg-[#1DA1F2]',
  facebook: 'bg-[#1877F2]',
  linkedin: 'bg-[#0A66C2]',
  youtube: 'bg-[#FF0000]',
  tiktok: 'bg-black',
  douyin: 'bg-black',
  wechat: 'bg-[#07C160]',
  line: 'bg-[#00B900]',
  xiaohongshu: 'bg-[#FF2442]'
};

const SocialIcon = ({ url, platform, size = 24, className = '', showLabel = false }: SocialIconProps) => {
  const getPlatform = (url) => {
    if (platform) return platform; // 如果直接传入platform，优先使用
    
    try {
      const domain = new URL(url).hostname;
      if (domain.includes('instagram')) return 'instagram';
      if (domain.includes('twitter')) return 'twitter';
      if (domain.includes('facebook')) return 'facebook';
      if (domain.includes('linkedin')) return 'linkedin';
      if (domain.includes('youtube')) return 'youtube';
      if (domain.includes('tiktok')) return 'tiktok';
      if (domain.includes('douyin')) return 'douyin';
      if (domain.includes('wechat') || domain.includes('weixin')) return 'wechat';
      if (domain.includes('line')) return 'line';
      if (domain.includes('xiaohongshu') || domain.includes('redbook')) return 'xiaohongshu';
      return null;
    } catch {
      return platform || null;
    }
  };

  const detectedPlatform = getPlatform(url);
  const IconComponent = detectedPlatform ? platformIcons[detectedPlatform] : FaLink;
  const colorClass = detectedPlatform ? platformColors[detectedPlatform] : 'bg-gray-500';
  
  const platformLabels = {
    instagram: 'Instagram',
    twitter: 'Twitter',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    tiktok: 'TikTok',
    douyin: '抖音',
    wechat: '微信',
    line: 'Line',
    xiaohongshu: '小红书'
  };

  return (
    <div className={`group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors ${className}`}>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full group-hover:scale-110 transition-transform ${
          colorClass.includes('from-') ? `bg-gradient-to-r ${colorClass}` : colorClass
        }`}
        aria-label={`Visit our ${detectedPlatform || 'social'} page`}
      >
        <IconComponent size={size} className="text-white" />
      </a>
      {showLabel && (
        <span className="text-sm font-medium text-[#141718] group-hover:text-[#377DFF]">
          {(detectedPlatform && platformLabels[detectedPlatform]) || 'Social'}
        </span>
      )}
    </div>
  );
};

export default SocialIcon;
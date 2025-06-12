
interface VideoItem {
  id: string;
  contentDetails: {
    duration: string;
  };
  snippet: {
    title: string;
  };
}

interface PlaylistItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
  };
}

interface PlaylistDetails {
  snippet: {
    title: string;
    channelTitle: string;
  };
}

export interface AnalysisResult {
  playlistTitle: string;
  channelName: string;
  totalVideos: number;
  analyzedRange: string;
  originalDuration: string;
  adjustedDuration: string;
  videoCount: number;
}

class YouTubeService {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
  }

  extractPlaylistId(url: string): string | null {
    const regex = /[&?]list=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  parseDuration(duration: string): number {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);
    
    if (!matches) return 0;
    
    const hours = parseInt(matches[1] || '0');
    const minutes = parseInt(matches[2] || '0');
    const seconds = parseInt(matches[3] || '0');
    
    return hours * 3600 + minutes * 60 + seconds;
  }

  formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  async analyzePlaylist(
    playlistUrl: string,
    startVideo: number = 1,
    endVideo?: number,
    playbackSpeed: number = 1
  ): Promise<AnalysisResult> {
    if (!this.apiKey) {
      throw new Error('YouTube API key is required. Please enter your API key.');
    }

    const playlistId = this.extractPlaylistId(playlistUrl);
    if (!playlistId) {
      throw new Error('Invalid YouTube playlist URL');
    }

    try {
      // Get playlist details
      const playlistResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${this.apiKey}`
      );
      
      if (!playlistResponse.ok) {
        throw new Error('Failed to fetch playlist details');
      }
      
      const playlistData = await playlistResponse.json();
      const playlist: PlaylistDetails = playlistData.items[0];
      
      if (!playlist) {
        throw new Error('Playlist not found or is private');
      }

      // Get all playlist items
      let allVideoIds: string[] = [];
      let nextPageToken = '';
      
      do {
        const itemsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&pageToken=${nextPageToken}&key=${this.apiKey}`
        );
        
        if (!itemsResponse.ok) {
          throw new Error('Failed to fetch playlist items');
        }
        
        const itemsData = await itemsResponse.json();
        const videoIds = itemsData.items.map((item: PlaylistItem) => item.snippet.resourceId.videoId);
        allVideoIds = [...allVideoIds, ...videoIds];
        nextPageToken = itemsData.nextPageToken || '';
      } while (nextPageToken);

      // Apply range filter
      const totalVideos = allVideoIds.length;
      const actualEndVideo = endVideo && endVideo <= totalVideos ? endVideo : totalVideos;
      const actualStartVideo = Math.max(1, Math.min(startVideo, totalVideos));
      
      const selectedVideoIds = allVideoIds.slice(actualStartVideo - 1, actualEndVideo);

      // Get video durations in batches of 50 (API limit)
      let totalDurationSeconds = 0;
      const batchSize = 50;
      
      for (let i = 0; i < selectedVideoIds.length; i += batchSize) {
        const batch = selectedVideoIds.slice(i, i + batchSize);
        const videoResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${batch.join(',')}&key=${this.apiKey}`
        );
        
        if (!videoResponse.ok) {
          throw new Error('Failed to fetch video details');
        }
        
        const videoData = await videoResponse.json();
        const batchDuration = videoData.items.reduce((sum: number, video: VideoItem) => {
          return sum + this.parseDuration(video.contentDetails.duration);
        }, 0);
        
        totalDurationSeconds += batchDuration;
      }

      const adjustedDurationSeconds = Math.round(totalDurationSeconds / playbackSpeed);
      
      return {
        playlistTitle: playlist.snippet.title,
        channelName: playlist.snippet.channelTitle,
        totalVideos,
        analyzedRange: `${actualStartVideo} - ${actualEndVideo}`,
        originalDuration: this.formatDuration(totalDurationSeconds),
        adjustedDuration: this.formatDuration(adjustedDurationSeconds),
        videoCount: selectedVideoIds.length,
      };
    } catch (error) {
      console.error('YouTube API Error:', error);
      throw error;
    }
  }
}

export const youtubeService = new YouTubeService();

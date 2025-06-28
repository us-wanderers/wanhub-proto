"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Bookmark,
  FileText,
  Share2,
  FastForward,
  Rewind,
  Subtitles,
} from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
  title: string
  duration: number
  onProgress?: (progress: number) => void
  onComplete?: () => void
  bookmarks?: number[]
  notes?: string[]
  subtitles?: { time: number; text: string }[]
}

export function StudentCoursePlayer({
  videoUrl,
  title,
  duration,
  onProgress,
  onComplete,
  bookmarks = [],
  notes = [],
  subtitles = [],
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showSubtitles, setShowSubtitles] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [currentNote, setCurrentNote] = useState("")
  const [userBookmarks, setUserBookmarks] = useState<number[]>(bookmarks)
  const [quality, setQuality] = useState("720p")
  const [showSettings, setShowSettings] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0]
    setVolume(vol)
    if (videoRef.current) {
      videoRef.current.volume = vol
    }
    setIsMuted(vol === 0)
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handlePlaybackRateChange = (rate: string) => {
    const newRate = Number.parseFloat(rate)
    setPlaybackRate(newRate)
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate
    }
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleAddBookmark = () => {
    const newBookmark = Math.floor(currentTime)
    setUserBookmarks((prev) => [...prev, newBookmark].sort((a, b) => a - b))
  }

  const handleAddNote = () => {
    if (currentNote.trim()) {
      // Save note with timestamp
      console.log("Adding note at", formatTime(currentTime), ":", currentNote)
      setCurrentNote("")
      setShowNotes(false)
    }
  }

  const jumpToBookmark = (time: number) => {
    handleSeek(time)
  }

  const skipForward = () => {
    handleSeek(Math.min(currentTime + 10, duration))
  }

  const skipBackward = () => {
    handleSeek(Math.max(currentTime - 10, 0))
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => {
      setCurrentTime(video.currentTime)
      onProgress?.(video.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("ended", handleEnded)
    }
  }, [onProgress, onComplete])

  const currentSubtitle = subtitles.find((sub) => sub.time <= currentTime && sub.time + 3 > currentTime)

  return (
    <div className="relative bg-black rounded-lg overflow-hidden group">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video"
        src={videoUrl}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setCurrentTime(0)
          }
        }}
      />

      {/* Subtitles */}
      {showSubtitles && currentSubtitle && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded">
          {currentSubtitle.text}
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity ${
          showControls ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <h3 className="text-white font-medium">{title}</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleAddBookmark}>
              <Bookmark className="w-4 h-4" />
            </Button>
            <Dialog open={showNotes} onOpenChange={setShowNotes}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <FileText className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Note</DialogTitle>
                  <DialogDescription>Add a note at {formatTime(currentTime)}</DialogDescription>
                </DialogHeader>
                <Textarea
                  placeholder="Enter your note..."
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  rows={4}
                />
                <DialogFooter>
                  <Button onClick={handleAddNote}>Save Note</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Share2 className="w-4 h-4" />
            </Button>
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Video Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Quality</label>
                    <Select value={quality} onValueChange={setQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1080p">1080p HD</SelectItem>
                        <SelectItem value="720p">720p HD</SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                        <SelectItem value="360p">360p</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Playback Speed</label>
                    <Select value={playbackRate.toString()} onValueChange={handlePlaybackRateChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.25">0.25x</SelectItem>
                        <SelectItem value="0.5">0.5x</SelectItem>
                        <SelectItem value="0.75">0.75x</SelectItem>
                        <SelectItem value="1">Normal</SelectItem>
                        <SelectItem value="1.25">1.25x</SelectItem>
                        <SelectItem value="1.5">1.5x</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Subtitles</label>
                    <Button variant="outline" size="sm" onClick={() => setShowSubtitles(!showSubtitles)}>
                      {showSubtitles ? "Hide" : "Show"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-16 h-16 text-white hover:bg-white/20 rounded-full"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="relative">
              <Progress value={(currentTime / duration) * 100} className="h-1 cursor-pointer" />
              {/* Bookmarks on progress bar */}
              {userBookmarks.map((bookmark, index) => (
                <div
                  key={index}
                  className="absolute top-0 w-2 h-1 bg-yellow-400 cursor-pointer transform -translate-x-1/2"
                  style={{ left: `${(bookmark / duration) * 100}%` }}
                  onClick={() => jumpToBookmark(bookmark)}
                />
              ))}
            </div>
            <div className="flex justify-between text-white text-xs">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={skipBackward}>
                <Rewind className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={skipForward}>
                <FastForward className="w-4 h-4" />
              </Button>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleMute}>
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <div className="w-20">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.1}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <span className="text-white text-sm">{playbackRate}x</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setShowSubtitles(!showSubtitles)}
              >
                <Subtitles className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleFullscreen}>
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      {userBookmarks.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-sm">Bookmarks</h4>
          <div className="flex flex-wrap gap-2">
            {userBookmarks.map((bookmark, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => jumpToBookmark(bookmark)}
                className="text-xs"
              >
                {formatTime(bookmark)}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

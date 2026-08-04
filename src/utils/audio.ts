/**
 * Romantic background music manager and sound effects
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a magical golden sparkle / seal crackle sound effect upon envelope open
 */
export function playEnvelopeOpenSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 1. Soft wax snap sound
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // 2. Ascending magical harp / chime notes (Golden Sparkle Sound)
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0, now + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.04 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.65);
    });
  } catch (e) {
    console.warn('Audio context error:', e);
  }
}

const DEFAULT_MP3_URL = "/audio/ordinary.mp3";

/**
 * Romantic Music Controller supporting both MP3 audio files (uploaded or URL) and Web Audio fallback
 */
export class RomanticMusicPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying = false;
  private synthTimer: number | null = null;
  private ctx: AudioContext | null = null;
  private currentUrl = DEFAULT_MP3_URL;
  private currentTrackName = "Alex Warren - Ordinary";

  constructor() {
    this.loadSavedAudio();
    this.initAudioElement();
  }

  private loadSavedAudio() {
    try {
      const savedAudio = localStorage.getItem('wedding_custom_audio');
      const savedName = localStorage.getItem('wedding_custom_audio_name');
      if (savedAudio) {
        this.currentUrl = savedAudio;
        if (savedName) this.currentTrackName = savedName;
      }
    } catch (e) {
      console.warn('Could not read saved custom audio:', e);
    }
  }

  private initAudioElement() {
    try {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.src = this.currentUrl;
      } else {
        this.audioElement = new Audio(this.currentUrl);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.6;
      }
    } catch (e) {
      console.warn('Audio element initialization failed:', e);
    }
  }

  public setCustomAudio(urlOrData: string, trackName?: string) {
    this.currentUrl = urlOrData;
    if (trackName) {
      this.currentTrackName = trackName;
    } else {
      this.currentTrackName = "Өздүк музыка";
    }

    try {
      localStorage.setItem('wedding_custom_audio', urlOrData);
      localStorage.setItem('wedding_custom_audio_name', this.currentTrackName);
    } catch (e) {
      console.warn('LocalStorage quota exceeded or restricted:', e);
    }

    const wasPlaying = this.isPlaying;
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = this.currentUrl;
      this.audioElement.load();
    }

    if (wasPlaying) {
      this.isPlaying = false;
      this.start();
    }
  }

  public resetToDefault() {
    localStorage.removeItem('wedding_custom_audio');
    localStorage.removeItem('wedding_custom_audio_name');
    this.currentUrl = DEFAULT_MP3_URL;
    this.currentTrackName = "Alex Warren - Ordinary";
    this.setCustomAudio(DEFAULT_MP3_URL, "Alex Warren - Ordinary");
  }

  public getCurrentTrackName(): string {
    return this.currentTrackName;
  }

  public async start(): Promise<boolean> {
    if (this.isPlaying) return true;
    this.isPlaying = true;

    // Try HTML5 Audio play first
    if (this.audioElement) {
      try {
        await this.audioElement.play();
        return true;
      } catch (err) {
        console.warn('HTML5 Audio blocked or failed, switching to Web Audio synth fallback', err);
      }
    }

    // Web Audio Synthesizer Fallback
    this.startSynthMelody();
    return true;
  }

  public stop() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.synthTimer !== null) {
      window.clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
  }

  private startSynthMelody() {
    this.ctx = getAudioContext();
    this.playNextSynthNote(0);
  }

  private playNextSynthNote(index: number) {
    if (!this.isPlaying || !this.ctx) return;

    // Soft romantic melody notes in F major
    const notes = [
      { note: 349.23, duration: 1.2 }, // F4
      { note: 440.00, duration: 1.2 }, // A4
      { note: 523.25, duration: 1.2 }, // C5
      { note: 659.25, duration: 1.8 }, // E5
      { note: 587.33, duration: 1.2 }, // D5
      { note: 523.25, duration: 1.8 }, // C5
      { note: 440.00, duration: 1.2 }, // A4
      { note: 392.00, duration: 2.4 }, // G4
    ];

    const current = notes[index % notes.length];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(current.note, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + current.duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + current.duration);

    const nextTime = current.duration * 800;
    this.synthTimer = window.setTimeout(() => {
      this.playNextSynthNote(index + 1);
    }, nextTime);
  }
}


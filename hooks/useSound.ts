import { useCallback, useEffect, useRef } from 'react';

// Simple beep using Web Audio API to avoid huge dependencies like Tone.js for just a click sound
// This mimics the 'MembraneSynth' feeling slightly
export const useClickSound = () => {
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        const initAudio = () => {
            if (!audioContextRef.current) {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                    audioContextRef.current = new AudioContextClass();
                }
            }
        };
        
        // Initialize on first click to handle autoplay policies
        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, []);

    const playSound = useCallback(() => {
        if (!audioContextRef.current) return;
        
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Mimic a short, low pitched percussive sound (MembraneSynth-ish)
        osc.frequency.setValueAtTime(60, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
    }, []);

    return playSound;
};
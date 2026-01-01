import React from 'react';

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    category: 'mobile' | 'web';
}

export interface Experience {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
}

export interface Education {
    id: number;
    degree: string;
    institution: string;
    period: string;
}

export interface Testimonial {
    id: number;
    text: string;
    author: string;
    position: string;
    image: string;
}

export interface Profile {
    id: string;
    name: string;
    url: string;
    iconColor: string;
    icon: React.ReactNode;
}
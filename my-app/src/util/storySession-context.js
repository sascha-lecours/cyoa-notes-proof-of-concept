import { createContext } from 'react';

export const StorySessionContext = createContext({
    isInStorySession: false,
    storySessionId: null,
    enterStorySession: () => {}, 
    exitStorySession: () => {}
});

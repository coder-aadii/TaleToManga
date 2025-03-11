import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MangaContext from '../context/MangaContext';

const CreateManga = () => {
  const { generateManga, error, generationProgress } = useContext(MangaContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    story: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { title, story } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear error for this field when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!story.trim()) {
      errors.story = 'Story is required';
    } else if (story.trim().length < 50) {
      errors.story = 'Story should be at least 50 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (validateForm()) {
      const manga = await generateManga(title, story);
      
      if (manga) {
        navigate(`/manga/${manga._id}`);
      }
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Your Manga</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {generationProgress > 0 && generationProgress < 100 ? (
        <div className="card p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Generating Your Manga</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please wait while we transform your story into manga panels...
          </p>
          
          <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mb-4">
            <div 
              className="bg-primary-600 h-4 rounded-full transition-all duration-300" 
              style={{ width: `${generationProgress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {generationProgress}% complete
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="card">
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              className={`input ${formErrors.title ? 'border-red-500' : ''}`}
              placeholder="Enter a title for your manga"
            />
            {formErrors.title && (
              <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="story" className="block text-gray-700 dark:text-gray-300 mb-2">
              Your Story
            </label>
            <textarea
              id="story"
              name="story"
              value={story}
              onChange={onChange}
              rows="10"
              className={`input resize-y ${formErrors.story ? 'border-red-500' : ''}`}
              placeholder="Write your story here. The more detailed your story, the better the manga will be."
            ></textarea>
            {formErrors.story && (
              <p className="text-red-500 text-sm mt-1">{formErrors.story}</p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Character count: {story.length} (minimum 50)
            </p>
          </div>
          
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Generate Manga
            </button>
          </div>
        </form>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Tips for Great Manga Generation</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Be descriptive about characters, settings, and actions</li>
          <li>Use clear, concise sentences</li>
          <li>Include emotional elements and dialogue</li>
          <li>Structure your story with a beginning, middle, and end</li>
          <li>The AI works best with stories that have visual elements</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateManga; 
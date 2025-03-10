/**
 * Datasets for the exploration interface
 * 
 * This file contains structured data about the portfolio owner
 * that is used in the notebook-style exploration interface.
 */

const datasets = {
  about_data: {
    name: 'about_data',
    description: 'Personal information and background',
    items: [
      {
        id: 'basic_info',
        name: 'basic_info',
        title: 'Basic Information',
        full_name: 'Your Name',
        role: 'Statistics & Data Science Master\'s Student',
        location: 'Your Location',
        email: 'your.email@example.com',
        related: {
          'Educational Background': 'education_data',
          'Technical Skills': 'skills_data'
        }
      },
      {
        id: 'interests',
        name: 'interests',
        title: 'Personal Interests',
        technical_interests: ['Machine Learning', 'Data Visualization', 'Statistical Modeling'],
        hobbies: ['Photography', 'Reading', 'Traveling'],
        related: {
          'Projects': 'projects_data'
        }
      }
    ]
  },
  
  skills_data: {
    name: 'skills_data',
    description: 'Technical skills and proficiency levels',
    items: [
      {
        id: 'programming',
        name: 'programming',
        title: 'Programming Languages',
        skills: [
          { name: 'Python', proficiency: 90, projects: 15 },
          { name: 'R', proficiency: 85, projects: 12 },
          { name: 'JavaScript', proficiency: 75, projects: 8 },
          { name: 'SQL', proficiency: 80, projects: 10 }
        ],
        related: {
          'Projects': 'projects_data'
        }
      },
      {
        id: 'data_science',
        name: 'data_science',
        title: 'Data Science Skills',
        skills: [
          { name: 'Machine Learning', proficiency: 85 },
          { name: 'Data Visualization', proficiency: 90 },
          { name: 'Statistical Analysis', proficiency: 88 },
          { name: 'Big Data Processing', proficiency: 75 }
        ],
        tools: ['Scikit-learn', 'TensorFlow', 'Pandas', 'Matplotlib', 'Seaborn', 'D3.js']
      }
    ]
  },
  
  education_data: {
    name: 'education_data',
    description: 'Educational background and qualifications',
    items: [
      {
        id: 'masters',
        name: 'masters',
        title: 'Master\'s Degree',
        degree: 'MSc in Statistics and Data Science',
        institution: 'Your University',
        location: 'City, Country',
        period: '2022 - 2024',
        description: 'Specialized in machine learning and statistical modeling with focus on...',
        key_courses: [
          'Advanced Machine Learning',
          'Statistical Learning',
          'Bayesian Statistics',
          'Deep Learning'
        ],
        related: {
          'Skills': 'skills_data'
        }
      },
      {
        id: 'bachelors',
        name: 'bachelors',
        title: 'Bachelor\'s Degree',
        degree: 'BSc in Computer Science',
        institution: 'Previous University',
        location: 'City, Country',
        period: '2018 - 2022',
        gpa: '3.85/4.0',
        honors: 'Graduated with honors',
        related: {
          'Projects': 'projects_data'
        }
      }
    ]
  },
  
  projects_data: {
    name: 'projects_data',
    description: 'Portfolio of data science and statistical projects',
    items: [
      {
        id: 'datathon',
        name: 'datathon',
        title: 'Healthcare Datathon Project',
        description: 'Developed a predictive model for patient readmission rates using healthcare data.',
        technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas'],
        role: 'Team Lead',
        achievements: [
          'Won 2nd place among 50 participating teams',
          'Achieved 87% accuracy in predictions',
          'Implemented novel feature engineering approach'
        ],
        challenges: 'Handling missing data and addressing class imbalance',
        link: 'https://github.com/yourusername/healthcare-datathon',
        related: {
          'Skills Used': 'skills_data'
        }
      },
      {
        id: 'thesis',
        name: 'thesis',
        title: 'Master\'s Thesis Research',
        description: 'Statistical analysis of climate data to identify long-term patterns and anomalies.',
        technologies: ['R', 'Time Series Analysis', 'Spatial Statistics'],
        key_findings: [
          'Identified significant warming trends in specific regions',
          'Developed new method for detecting climate anomalies',
          'Created interactive visualization of global temperature changes'
        ],
        status: 'Ongoing',
        related: {
          'Educational Background': 'education_data'
        }
      }
    ]
  }
};

export default datasets;
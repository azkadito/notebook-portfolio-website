import React from 'react';
import Head from 'next/head';
import ExplorationNotebook from '../components/exploration/ExplorationNotebook';

export default function ExplorationPage() {
  // Define sample datasets
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
  
  // Define initial cell
  const initialCell = {
    code: `# Welcome to my interactive data exploration notebook!
# Let's explore datasets about me as a data scientist.

available_datasets = list_available_datasets()
print("Available datasets:")
for dataset in available_datasets:
    print(f"  > {dataset}")

# Select a dataset to explore by clicking on its name`,
    output: (
      <div className="dataset-list">
        <h3 className="text-xl font-mono mb-4 text-terminal-green">Available datasets:</h3>
        <ul className="space-y-3">
          {Object.keys(datasets).map(datasetKey => (
            <li key={datasetKey} className="flex items-start">
              <span className="text-terminal-blue mr-2">•</span>
              <div>
                <button
                  onClick={() => document.dispatchEvent(new CustomEvent('notebookAction', {
                    detail: { type: 'load_dataset', dataset: datasetKey }
                  }))}
                  className="interactive-keyword"
                >
                  &gt; {datasetKey}
                </button>
                <p className="text-sm text-gray-400 ml-6 mt-1">{datasets[datasetKey].description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ),
    interactiveElements: Object.keys(datasets).map(datasetKey => ({
      start: `# Select a dataset to explore by clicking on its name`.length - 5,
      end: `# Select a dataset to explore by clicking on its name`.length,
      type: 'comment',
      tooltip: `Load ${datasetKey} dataset`,
      action: {
        type: 'load_dataset',
        dataset: datasetKey
      }
    }))
  };
  
  // Handle custom event for notebook interactions
  React.useEffect(() => {
    const handleNotebookAction = (event) => {
      const action = event.detail;
      if (action && action.type === 'load_dataset') {
        // Find the notebook component and call its handler function directly
        const notebookElement = document.querySelector('.exploration-notebook');
        if (notebookElement) {
          // Access the component's props/methods through internal refs
          // This is a workaround for the output buttons
          const notebook = notebookElement.__reactFiber$?.return?.stateNode;
          if (notebook && notebook.handleInteraction) {
            notebook.handleInteraction(action);
          }
        }
      }
    };
    
    document.addEventListener('notebookAction', handleNotebookAction);
    
    return () => {
      document.removeEventListener('notebookAction', handleNotebookAction);
    };
  }, []);
  
  return (
    <>
      <Head>
        <title>Interactive Data Explorer | Your Name</title>
        <meta name="description" content="Explore information about me through an interactive data science notebook" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Terminal-styled title */}
        <div className="terminal-window mb-8">
          <div className="terminal-header">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-xs text-gray-400">terminal – data-explorer</div>
          </div>
          <div className="terminal-body">
            <h1 className="text-3xl font-mono font-bold mb-2 text-terminal-green">
              Data Explorer <span className="text-gray-400 text-xl">// notebook interface</span>
            </h1>
            
            <div className="border-t border-gray-800 pt-4 mt-4">
              <p className="mb-2"><span className="text-terminal-green">$</span> <span className="text-terminal-blue">cat</span> README.md</p>
              <div className="pl-4 mb-4">
                <p className="text-gray-300 mb-2">
                  Welcome to my interactive data explorer! This notebook-style interface lets you explore information about me as if you were a data scientist analyzing a dataset.
                </p>
                <p className="text-gray-300">
                  Click on the highlighted elements in the code cells or use the interactive elements in the output to navigate through the information.
                </p>
              </div>
              
              <p className="mb-2"><span className="text-terminal-green">$</span> <span className="text-terminal-blue">python</span> explorer.py</p>
            </div>
          </div>
        </div>
        
        <ExplorationNotebook 
          initialCells={[initialCell]}
          datasets={datasets}
          enableReset={true}
        />
      </main>
    </>
  );
}

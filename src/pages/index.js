import Head from 'next/head';
import NotebookLayout from '../components/layout/NotebookLayout';

export default function Home() {
  // Define notebooks
  const notebooks = [
    {
      id: 'about',
      title: 'About Me',
      icon: '👨‍💻',
      category: 'Personal',
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: '📊',
      category: 'Work',
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: '🛠️',
      category: 'Technical',
    },
    {
      id: 'education',
      title: 'Education',
      icon: '🎓',
      category: 'Personal',
    },
    {
      id: 'interests',
      title: 'Interests',
      icon: '🏄‍♂️',
      category: 'Personal',
    }
  ];
  
  // Define datasets
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
          tools: ['Scikit-learn', 'TensorFlow', 'Pandas', 'Matplotlib', 'Seaborn', 'D3.js'],
          related: {
            'Educational Background': 'education_data'
          }
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
          id: 'dashboard',
          name: 'dashboard',
          title: 'Interactive COVID-19 Dashboard',
          description: 'Built an interactive web dashboard for COVID-19 data visualization and analysis',
          technologies: ['JavaScript', 'D3.js', 'React', 'Node.js', 'Express'],
          features: [
            'Real-time data integration from multiple sources',
            'Interactive visualizations with drill-down capability',
            'Predictive modeling for trend analysis',
            'Mobile-responsive design'
          ],
          github: 'https://github.com/yourusername/covid-dashboard',
          related: {
            'Skills Used': 'skills_data'
          }
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>Data Science Portfolio | Notebook Interface</title>
        <meta name="description" content="Interactive data science portfolio with notebook interface" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NotebookLayout 
        notebooks={notebooks}
        datasets={datasets}
        defaultActiveNotebook="about"
      />
    </>
  );
}

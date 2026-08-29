import React from 'react'

const FeatureCard = ({icon,title,description,custom}) => {
  return (
      <div className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          

          <div className="text-3xl mb-4">{icon}</div>
          
          <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 leading-relaxed">{ description}</p>
    </div>
  )
}

export default FeatureCard

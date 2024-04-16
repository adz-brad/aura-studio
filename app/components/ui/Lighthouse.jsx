'use client'

import { DonutChart } from 'react-circle-chart'

const Lighthouse = ({ scores }) => {

    const { performance, seo, accessibility, bestPractices } = scores

    const useColor = (score) => {
        if(score < 25){
            return "#dc2626"
        }
        else if(score >= 25 && score < 50){
            return "#ea580c"
        }
        else if(score >= 50 && score < 75){
            return "#eab308"
        }
        else if(score >= 75){
            return "#22c55e"
        }
    }

  return (
    <>
    {!performance && !bestPractices && !accessibility && !seo && <div className="text-sm font-extralight m-auto">Performance Data Unavailable</div>}
    <div className="flex flex-row space-x-4 mt-auto">
        
        {performance &&
            <div className="flex flex-col items-center space-y-2">
                <DonutChart
                    items={[{value: performance, label: 'Performance', color: useColor(performance) }]}
                    size="65px"
                    trackWidth='sm'
                    trackColor='#3f3f46'
                    showTotal
                    totalFontSize='12px'
                    totalTextColor='#FFFFFF'
                    tooltipSx={{"display": "none"}}
                />
                <span className='text-xs'>Performance</span>
            </div>
        }
        {seo &&
            <div className="flex flex-col items-center space-y-2">
                <DonutChart
                    items={[{value: seo, label: 'SEO', color: useColor(seo) }]}
                    size="65px"
                    trackWidth='sm'
                    trackColor='#3f3f46'
                    showTotal
                    totalFontSize='12px'
                    totalTextColor='#FFFFFF'
                    tooltipSx={{"display": "none"}}
                />
                <span className='text-xs'>SEO</span>
            </div>
        }
                {accessibility &&
            <div className="flex flex-col items-center space-y-2">
                <DonutChart
                    items={[{value: accessibility, label: 'Accessibility', color: useColor(accessibility) }]}
                    size="65px"
                    trackWidth='sm'
                    trackColor='#3f3f46'
                    showTotal
                    totalFontSize='12px'
                    totalTextColor='#FFFFFF'
                    tooltipSx={{"display": "none"}}
                />
                <span className='text-xs'>Accessibility</span>
            </div>
        }
                {bestPractices &&
            <div className="flex flex-col items-center space-y-2">
                <DonutChart
                    items={[{value: bestPractices, label: 'Best Practices', color: useColor(bestPractices) }]}
                    size="65px"
                    trackWidth='sm'
                    trackColor='#3f3f46'
                    showTotal
                    totalFontSize='12px'
                    totalTextColor='#FFFFFF'
                    tooltipSx={{"display": "none"}}
                />
                <span className='text-xs'>Best Practices</span>
            </div>
        }
    </div>
    </>
  )
}
export default Lighthouse
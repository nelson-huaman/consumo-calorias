import { useMemo, type Dispatch } from "react"
import type { Activity } from "../types"
import { categories } from "../data/cotegories"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import type { ActivityAction } from "../reducers/activity-reducer"

type ActivityListProps = {
   activities: Activity[]
   dispatch: Dispatch<ActivityAction>
}

function ActivityList({activities, dispatch} : ActivityListProps) {

   const categoryName = useMemo(() =>
      (category : Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
   , [activities] )

   const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

   return (
      <>
         <h2 className='text-4xl font-bold text-slate-700 text-center'>Comida y Actividades</h2>

         { isEmptyActivities ?
            <p className="text-center my-5">No hay Actividades aún...</p> :
            activities.map(activity => (
               <div
                  key={activity.id}
                  className="px-5 py-10 bg-white flex justify-between items-center gap-3 rounded-lg shadow mt-5"
               >
                  <div className="space-y-2 relative">
                     <p className={`absolute -top-8 -left-8 text-white font-bold px-10 py-2 uppercase ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                        {categoryName(+activity.category)}
                     </p>
                     <p className="text-2xl font-bold pt-5">{activity.name}</p>
                     <p className="font-black text-4xl text-lime-500">
                        {activity.calories} {''}
                        <span>Calorias</span>
                     </p>
                  </div>
                  <div className="flex gap-5 items-center">
                     <button className="cursor-pointer"
                        onClick={() => dispatch({ type: 'set-activeId', payload: {id: activity.id}})}
                     >
                        <PencilSquareIcon
                           className="h-8 w-8 text-gray-800"
                        />
                     </button>
                     <button className="cursor-pointer"
                        onClick={() => dispatch({ type: 'delete-activity', payload: {id: activity.id}})}
                     >
                        <XCircleIcon
                           className="h-8 w-8 text-red-600"
                        />
                     </button>
                  </div>
               </div>
            ))
         }
      </>
   )
}

export default ActivityList
/* eslint-disable react/prop-types */
function FlowCard({course}){
    const altIMG = `data:image/svg+xml,               <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>`
    console.log(course)
    return (<>
    <div className="bg-red-400 flex justify-center">
    <a href="#" className="flex flex-col h-full w-full items-center  border bg-red-400 border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={course.course_thumbnail ? course.course_thumbnail : (`${altIMG}`) } alt=""></img>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course ? course.title : "-----"}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{course ? course.desc : "-----"}</p>
        <br />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Course By :</b> <span className="font-mono underline">{course ? course.createdBy : "-----"}</span></p>

    </div>
</a>
    </div>


    </>)
}

export default FlowCard;
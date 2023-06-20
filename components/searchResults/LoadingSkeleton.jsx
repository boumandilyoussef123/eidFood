import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function LoadingSkeleton() {


    return (
        <>
            <div className="flex items-start justify-between h-full max-w-5xl p-2 duration-500 ease-in-out hover:drop-shadow-2xl">
                <div className="flex flex-col items-start justify-center w-[900px] h-full">
                    <h1 className="w-11/12 text-4xl font-bold text-primary">
                        <Skeleton
                            baseColor="#cbdacf" highlightColor="#e1e0d4" width={400} height={40} />
                    </h1>
                    <div className="flex items-center mt-3 space-x-2">
                        <Skeleton
                            baseColor="#cbdacf" highlightColor="#e1e0d4" width={50} height={25} />
                        <Skeleton
                            baseColor="#cbdacf" highlightColor="#e1e0d4" width={200} height={25} />
                    </div>

                    <div className="flex items-center mt-3 ml-4 space-x-2">
                        <p className="text-xl text-font-color-light">
                            <Skeleton
                                baseColor="#cbdacf" highlightColor="#e1e0d4" width={200} height={25} />
                        </p>
                    </div>
                    <div className="flex items-center ml-4 space-x-2">
                        <p className="text-xl text-font-color-light">
                            <Skeleton
                                baseColor="#cbdacf" highlightColor="#e1e0d4" width={200} height={25} />
                        </p>
                    </div>
                    <div className="flex items-center ml-4 space-x-2">
                        <p className="text-xl text-font-color-light">
                            <Skeleton
                                baseColor="#cbdacf" highlightColor="#e1e0d4" width={200} height={25} />
                        </p>
                    </div>

                    <div className="flex items-center justify-between w-9/12 mx-auto mt-6">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-font-color-light">
                                <Skeleton
                                    baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                            </h3>
                            <h3 className="text-xl text-font-color-light">
                                <Skeleton
                                    baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                            </h3>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-font-color-light">
                                <Skeleton
                                    baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                            </h3>
                            <h3 className="text-xl text-font-color-light">
                                <Skeleton
                                    baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                            </h3>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-font-color-light">
                                <Skeleton
                                    baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                            </h3>
                            <h3 className="text-xl text-font-color-light">
                                <Skeleton
                                    baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                            </h3>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-font-color-light">
                                <Skeleton
                                    baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                            </h3>
                            <h3 className="text-xl text-font-color-light">
                                <Skeleton
                                    baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-end w-4/12 h-full my-auto">
                    <div className="flex flex-col items-center justify-center">
                        <Skeleton
                            baseColor="#cbdacf" highlightColor="#e1e0d4"
                            width={256} height={256} />
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                            <Skeleton
                                baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                            <Skeleton
                                baseColor="#cbdacf" highlightColor="#e1e0d4" width={100} height={25} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default LoadingSkeleton
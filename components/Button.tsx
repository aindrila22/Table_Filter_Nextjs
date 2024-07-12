import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Props {
    rowsPerPage: number,
    setCurrentPage: (page: number) => void,
    currentPage: number,
    totalPages: number,
    totalColumns:number
}

const Button: React.FC<Props> = ({ rowsPerPage, setCurrentPage, currentPage, totalPages, totalColumns }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between items-center w-full px-5">
      <div className="w-full text-gray-400">Showing {rowsPerPage} data rows in {totalColumns} columns</div>
      <div className="flex justify-end items-center w-full mb-4 text-gray-200 space-x-4">
        <button
          className="text-green-300 text-xs uppercase border border-gray-400 bg-transparent rounded-md py-1 px-2 flex justify-center items-center"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronDoubleLeftIcon className="h-5 w-5" />
          <label> Previous</label>
        </button>
        <span className="text-base">
          page {currentPage} of {totalPages}
        </span>
        <button
          className="text-green-300 text-xs uppercase border border-gray-400 rounded-md py-1 px-2 flex justify-center items-center"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <label> Next</label> <ChevronDoubleRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default Button;

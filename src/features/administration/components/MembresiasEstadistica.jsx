import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { FaIdBadge, FaUser } from 'react-icons/fa'

export const MembresiasEstadistica = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Distribución de Membresías
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <AiFillStar className="text-2xl mr-4 text-yellow-500" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      Premium
                    </div>
                    <div className="text-sm text-gray-500">3,500</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-yellow-500"
                      style={{
                        width: `${(3500 / (3500 + 2100 + 800 + 150)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <FaIdBadge className="text-2xl mr-4 text-green-500" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      Prueba
                    </div>
                    <div className="text-sm text-gray-500">2,100</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-green-500"
                      style={{
                        width: `${(2100 / (3500 + 2100 + 800 + 150)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <FaUser className="text-2xl mr-4 text-purple-500" />
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">
                      Gratis
                    </div>
                    <div className="text-sm text-gray-500">800</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-purple-500"
                      style={{
                        width: `${(800 / (3500 + 2100 + 800)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center">
              Total de membresías: {(3500 + 2100 + 800).toLocaleString()}
            </p>
          </div>
  )
}

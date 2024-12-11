import React, { useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { FaIdBadge, FaUser } from 'react-icons/fa'
import { useDashboardMembresias } from '../hooks'

export const MembresiasEstadistica = () => {
  const { loadMembresiaTotales, totalMembresias, isLoading } = useDashboardMembresias();

  useEffect(() => {
    loadMembresiaTotales();
  }, [loadMembresiaTotales]);
  
const { premium = 0, prueba = 0, gratis = 0 } = totalMembresias || {};

  // Total de membresías
  const total = premium + prueba + gratis;
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
                    <div className="text-sm text-gray-500">{premium}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-yellow-500"
                      style={{
                        width: `${(premium / total) * 100}%`,
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
                    <div className="text-sm text-gray-500">{prueba}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-green-500"
                      style={{
                        width: `${(prueba / total) * 100}%`,
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
                    <div className="text-sm text-gray-500">{gratis}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-purple-500"
                      style={{
                        width: `${(gratis / total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center">
              Total de membresías: {total.toLocaleString()}
            </p>
          </div>
  )
}

// src/store/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTeam } from '@/lib/getTeam'
import { getTestimonials } from '@/lib/getTestimonials'
import { getLegalConsultation } from '@/lib/getLegalConsultation'
import { getSlides } from '@/lib/getSlides'

const makeError = (err) => ({
  status: err.status ?? 'CUSTOM_ERROR',
  data: err.message ?? String(err),
})

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }), // unused by our queryFn helpers
  endpoints: (builder) => ({
    // 1) Team members
    getTeam: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, _fetchBase) {
        try {
          const data = await getTeam()
          return { data }
        } catch (err) {
          return { error: makeError(err) }
        }
      },
      keepUnusedDataFor: 600,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }),

    // 2) Testimonials
    getTestimonials: builder.query({
      async queryFn(_arg) {
        try {
          const data = await getTestimonials()
          return { data }
        } catch (err) {
          return { error: makeError(err) }
        }
      },
      keepUnusedDataFor: 600,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }),

    // 3) Legal Consultation
    getLegalConsultation: builder.query({
      async queryFn(_arg) {
        try {
          const data = await getLegalConsultation()
          return { data }
        } catch (err) {
          return { error: makeError(err) }
        }
      },
      keepUnusedDataFor: 600,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }),

    // 4) Slides
    getSlides: builder.query({
      async queryFn(_arg) {
        try {
          const data = await getSlides()
          return { data }
        } catch (err) {
          return { error: makeError(err) }
        }
      },
      keepUnusedDataFor: 600,
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }),
  }),
})

export const {
  useGetTeamQuery,
  useGetTestimonialsQuery,
  useGetLegalConsultationQuery,
  useGetSlidesQuery,
} = apiSlice

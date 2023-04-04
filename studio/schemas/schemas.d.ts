/*
 * schemas.d.ts
 * author: evan kirkiles
 * created on Tue Apr 04 2023
 * 2023 the nobot space,
 */

// extension type to allow us to pass in codegen option as input
type SanityCodegenField = Parameters<typeof import('sanity').defineField>[0] & {
  codegen: {required: boolean}
}

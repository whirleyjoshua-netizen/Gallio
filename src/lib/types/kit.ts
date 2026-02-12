// Kit Page Config — stored in Display.kitConfig JSON field

export interface KitPageConfig {
  kitId: string          // 'athlete'
  version: number        // Schema version for future migrations
  profile: Record<string, any>  // Kit-specific profile fields
}

import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * Title — `string`
   *
   * Main title to apply to the entity.
   */
  title: string;

  /**
   * Description — `array`
   *
   * Describe this entity.
   */
  description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Slug — `slug`
   *
   * URL slug to access this resource under.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Page Number — `number`
   *
   * The number of this page in the website.
   */
  pageNum: number;

  /**
   * Entity Type — `string`
   *
   * What type of data is shown on this page?
   */
  entityType: string;

  /**
   * Entity Title — `string`
   *
   * Label to give the data shown on this page.
   */
  entityTitle: string;
}

/**
 * ScopedCopy
 *
 *
 */
export interface Scopedcopy extends SanityDocument {
  _type: "scopedcopy";

  /**
   * Content — `array`
   *
   * The contents of this block.
   */
  content: Array<SanityKeyed<SanityBlock>>;

  /**
   * Scope Slug — `string`
   *
   * The slug where this copy is located.
   */
  slug: string;
}

/**
 * Project
 *
 *
 */
export interface Project extends SanityDocument {
  _type: "project";

  /**
   * Title — `string`
   *
   * Main title to apply to the entity.
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * URL slug to access this resource under.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Location — `string`
   *
   * Where this entity occurred.
   */
  location?: string;

  /**
   * Cover Image — `image`
   *
   * Cover image to show for this entity.
   */
  cover: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Caption — `string`
     *
     * A caption for the image, also to be used as alt text.
     */
    caption?: string;
  };

  /**
   * Start Date — `date`
   *
   * When did this entity start?
   */
  startDate?: string;

  /**
   * End Date — `date`
   *
   * When did this entity end? (if ever)
   */
  endDate?: string;

  /**
   * Description — `array`
   *
   * Describe this entity.
   */
  description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Tech Stack — `array`
   *
   * When did this entity end? (if ever)
   */
  techStack?: Array<SanityKeyed<string>>;

  /**
   * Tools Used — `array`
   *
   *
   */
  toolsUsed?: Array<SanityKeyed<string>>;
}

/**
 * Work
 *
 *
 */
export interface Work extends SanityDocument {
  _type: "work";

  /**
   * Role — `string`
   *
   * The role this entity refers to.
   */
  role: string;

  /**
   * Slug — `slug`
   *
   * URL slug to access this resource under.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Company — `string`
   *
   * The company this entity refers to.
   */
  company: string;

  /**
   * Cover Image — `image`
   *
   * Cover image to show for this entity.
   */
  cover: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Caption — `string`
     *
     * A caption for the image, also to be used as alt text.
     */
    caption?: string;
  };

  /**
   * Location — `string`
   *
   * Where this entity occurred.
   */
  location?: string;

  /**
   * Start Date — `date`
   *
   * When did this entity start?
   */
  startDate?: string;

  /**
   * End Date — `date`
   *
   * When did this entity end? (if ever)
   */
  endDate?: string;

  /**
   * Description — `array`
   *
   * Describe this entity.
   */
  description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Tech Stack — `array`
   *
   * When did this entity end? (if ever)
   */
  techStack?: Array<SanityKeyed<string>>;

  /**
   * Tools Used — `array`
   *
   *
   */
  toolsUsed?: Array<SanityKeyed<string>>;
}

/**
 * Design
 *
 *
 */
export interface Design extends SanityDocument {
  _type: "design";

  /**
   * Title — `string`
   *
   * Main title to apply to the entity.
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * URL slug to access this resource under.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Location — `string`
   *
   * Where this entity occurred.
   */
  location?: string;

  /**
   * Start Date — `date`
   *
   * When did this entity start?
   */
  startDate?: string;

  /**
   * Description — `array`
   *
   * Describe this entity.
   */
  description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Tech Stack — `array`
   *
   * When did this entity end? (if ever)
   */
  techStack?: Array<SanityKeyed<string>>;

  /**
   * Tools Used — `array`
   *
   *
   */
  toolsUsed?: Array<SanityKeyed<string>>;
}

/**
 * Play
 *
 *
 */
export interface Play extends SanityDocument {
  _type: "play";

  /**
   * Title — `string`
   *
   * Main title to apply to the entity.
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * URL slug to access this resource under.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Cover Image — `image`
   *
   * Cover image to show for this entity.
   */
  cover: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;

    /**
     * Caption — `string`
     *
     * A caption for the image, also to be used as alt text.
     */
    caption?: string;
  };

  /**
   * Location — `string`
   *
   * Where this entity occurred.
   */
  location?: string;

  /**
   * Description — `array`
   *
   * Describe this entity.
   */
  description?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Start Date — `date`
   *
   * When did this entity start?
   */
  startDate?: string;

  /**
   * End Date — `date`
   *
   * When did this entity end? (if ever)
   */
  endDate?: string;
}

export type Documents = Page | Scopedcopy | Project | Work | Design | Play;

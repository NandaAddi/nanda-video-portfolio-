-- ===================================================================
-- Supabase Schema: Portfolio Management (Nanda Addi Wijaya)
-- Table Name: hello_portfolio_projects (Prefixed with hello_)
-- ===================================================================

-- Migration helper: Rename existing table if previously created
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'portfolio_projects') THEN
        ALTER TABLE public.portfolio_projects RENAME TO hello_portfolio_projects;
    END IF;
    -- Add videos column if not exists
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'hello_portfolio_projects' 
          AND column_name = 'videos'
    ) THEN
        ALTER TABLE public.hello_portfolio_projects ADD COLUMN videos JSONB DEFAULT '[]'::jsonb;
    ELSE
        ALTER TABLE public.hello_portfolio_projects ALTER COLUMN videos DROP NOT NULL;
        ALTER TABLE public.hello_portfolio_projects ALTER COLUMN videos SET DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- 0b. Migration: Update Category Check Constraint to allow 'ai' (AI Video)
DO $$ 
BEGIN 
    ALTER TABLE public.hello_portfolio_projects DROP CONSTRAINT IF EXISTS hello_portfolio_projects_category_check;
    ALTER TABLE public.hello_portfolio_projects ADD CONSTRAINT hello_portfolio_projects_category_check CHECK (category IN ('editing', 'commercial', 'motion', 'ai'));
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.hello_portfolio_projects (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL CHECK (category IN ('editing', 'commercial', 'motion', 'ai')),
    duration TEXT NOT NULL,
    youtube_id TEXT NOT NULL,
    videos JSONB DEFAULT '[]'::jsonb,
    thumbnail_url TEXT NOT NULL,
    tools TEXT[] NOT NULL DEFAULT '{}',
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    
    -- Localized Content: English (en)
    title_en TEXT NOT NULL,
    client_en TEXT NOT NULL,
    category_label_en TEXT NOT NULL DEFAULT 'Video Editing',
    role_en TEXT NOT NULL,
    description_en TEXT NOT NULL,
    full_description_en TEXT NOT NULL,

    -- Localized Content: Indonesian (id)
    title_id TEXT NOT NULL,
    client_id TEXT NOT NULL,
    category_label_id TEXT NOT NULL DEFAULT 'Video Editing',
    role_id TEXT NOT NULL,
    description_id TEXT NOT NULL,
    full_description_id TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.hello_portfolio_projects ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
-- Allow anyone (public anon & visitors) to read published projects
DROP POLICY IF EXISTS "Allow public read published projects" ON public.hello_portfolio_projects;
CREATE POLICY "Allow public read published projects"
    ON public.hello_portfolio_projects
    FOR SELECT
    USING (is_published = true);

-- Allow authenticated users (admin login) to perform full CRUD operations
DROP POLICY IF EXISTS "Allow authenticated users full control" ON public.hello_portfolio_projects;
CREATE POLICY "Allow authenticated users full control"
    ON public.hello_portfolio_projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Initial Seed Data (Existing Projects)
INSERT INTO public.hello_portfolio_projects (
    id, category, duration, youtube_id, thumbnail_url, tools, sort_order, is_published,
    title_en, client_en, category_label_en, role_en, description_en, full_description_en,
    title_id, client_id, category_label_id, role_id, description_id, full_description_id
) VALUES 
(
    'project-bangsatrio-gaming',
    'editing',
    '18:45',
    'kJQP7kiw5Fk',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    ARRAY['Premiere', 'Audition', 'Photoshop'],
    1,
    true,
    'BANGSATRIO YouTube Series - High Stakes Roleplay',
    'BANGSATRIO YouTube (100K+ Views)',
    'Video Editing',
    'Lead Video Editor & Sound Designer',
    'Intense narrative editing featuring punchy sound design, rapid-fire pacing, and cinematic color treatment driving high audience retention.',
    'A flagship episode for the BANGSATRIO channel crossing over 100K organic views. Blends spontaneous situational humor with dynamic story progression, surgical sound effects, and animated kinetic subtitles to maximize YouTube viewer watch time.',
    'BANGSATRIO YouTube Series - High Stakes Roleplay',
    'BANGSATRIO YouTube (100K+ Views)',
    'Video Editing',
    'Lead Video Editor & Sound Designer',
    'Penyuntingan video naratif intens dengan audio mixing dramatis, efek sound fx cepat, dan color grading sinematik yang menghasilkan retensi penonton tinggi.',
    'Salah satu episode unggulan kanal BANGSATRIO yang berhasil menembus lebih dari 100K penonton organik. Menggabungkan komedi spontan dengan storytelling dinamis, sound design presisi, serta motion tracking caption untuk memaksimalkan watch time penonton YouTube.'
),
(
    'project-aksara-commercial',
    'commercial',
    '02:15',
    'L_LUpnjgPso',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    ARRAY['Premiere', 'Photoshop'],
    2,
    true,
    'Aksara Picture Commercial Visuals - Brand Story',
    'Aksara Picture Malang',
    'Commercial Video',
    'Videographer & Colorist',
    'Cinematic brand commercial campaign produced with atmospheric lighting setups and dynamic handheld camera blocking.',
    'Independent commercial campaign produced in partnership with Aksara Picture Malang. Directed on-location lighting, camera framing, and final color grading to deliver an exclusive, warm, and cinematic brand atmosphere.',
    'Aksara Picture Commercial Visuals - Brand Story',
    'Aksara Picture Malang',
    'Commercial Video',
    'Videographer & Colorist',
    'Produksi videografi komersial berkonsep sinematik untuk kampanye brand lokal dengan pencahayaan atmosferik dan sinematografi dinamis.',
    'Proyek komersial independen bersama Aksara Picture Malang. Bertanggung jawab mulai dari pengaturan tata cahaya di lokasi, komposisi framing kamera, hingga grading warna akhir untuk menghadirkan mood hangat dan eksklusif.'
),
(
    'project-kultus-projection-mapping',
    'motion',
    '01:45',
    '2g811Eo7K8U',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    ARRAY['After Effects', 'Premiere', 'Seadance AI'],
    3,
    true,
    'Kultus Visual - Architectural Projection Mapping & Motion FX',
    'Kultus Visual',
    'Motion Graphics',
    'Motion Graphic Designer & 3D Animator',
    'Experimental 3D motion graphics and geometric projection mapping engineered for multimedia live stage installations.',
    'Experimental motion graphics installation developed in collaboration with Kultus Visual. Utilized particle dynamics, optical depth illusions, and audio-reactive pacing tailored for large-format stage projection mapping.',
    'Kultus Visual - Architectural Projection Mapping & Motion FX',
    'Kultus Visual',
    'Motion Graphics',
    'Motion Graphic Designer & 3D Animator',
    'Eksplorasi visual motion graphics 3D dan projection mapping geometris untuk panggung pertunjukan visual seni multimedia.',
    'Karya motion graphics eksperimental berkolaborasi dengan Kultus Visual. Menggunakan teknik particle dynamics, ilusi optik kedalaman ruang, dan sinkronisasi audio-reaktif untuk instalasi projection mapping panggung seni.'
),
(
    'project-indopride-trailer',
    'editing',
    '03:10',
    'dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
    ARRAY['Premiere', 'Audition', 'CapCut'],
    4,
    true,
    'Indopride Roleplay - Official Season Cinematic Trailer',
    'Indopride Roleplay',
    'Video Editing',
    'Video Editor & Sound FX Artist',
    'High-octane season launch cinematic trailer with seamless speed ramping, immersive foley soundscapes, and orchestral score.',
    'Official promotional trailer for the Indopride Roleplay gaming community. Engineered multi-cam game capture sequences, precision audio denoising, custom animated typography, and a stylized teal-and-orange cinematic color pipeline.',
    'Indopride Roleplay - Official Season Cinematic Trailer',
    'Indopride Roleplay',
    'Video Editing',
    'Video Editor & Sound FX Artist',
    'Trailer sinematik peresmian season baru dengan pacing cepat, transisi kamera mulus, dan perpaduan musik orkestra megah.',
    'Trailer promosi resmi untuk komunitas gaming Indopride Roleplay. Menggunakan footage multi-sudut, peredaman noise audio, subtitle kustom beranimasi, serta grading teal & orange sinematik.'
),
(
    'project-bina-construction',
    'commercial',
    '04:20',
    'fJ9rUzIMcZQ',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    ARRAY['Premiere', 'Photoshop', 'Canva'],
    5,
    true,
    'Bina Project Construction - Infrastructure Corporate Showcase',
    'Bina Project Construction',
    'Commercial Video',
    'Videographer & Video Editor',
    'Corporate overview and large-scale infrastructure project documentation utilizing 4K aerial drone passes and motion infographics.',
    'Corporate documentary produced for a premier regional infrastructure firm. Interweaves aerial survey cinematography, executive interviews, and motion graphic milestone charts to deliver a compelling investor presentation video.',
    'Bina Project Construction - Infrastructure Corporate Showcase',
    'Bina Project Construction',
    'Commercial Video',
    'Videographer & Video Editor',
    'Video profil korporat dan dokumentasi proyek konstruksi berskala besar menggunakan aerial drone capture dan infografis modern.',
    'Video profil perusahaan kontraktor yang memadukan keindahan lanskap konstruksi, wawancara direksi, dan infografik progres proyek secara informatif dan elegan untuk kebutuhan presentasi investor.'
),
(
    'project-webenze-motion',
    'motion',
    '01:30',
    '3JZ_D3ELwOQ',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    ARRAY['After Effects', 'Google Flow', 'Premiere'],
    6,
    true,
    'Webenze Labs - Interactive Web Platform 3D Motion Reel',
    'Webenze Labs',
    'Motion Graphics',
    'Motion Designer & UI Animator',
    'Product launch motion reel featuring 3D hardware perspective mockups, kinetic typography, and interface choreography.',
    'Interactive product release showreel created for Webenze Labs. Showcases interface fluidity, micro-interaction responsiveness, and cutting-edge digital craftsmanship through synchronized 3D device choreography.',
    'Webenze Labs - Interactive Web Platform 3D Motion Reel',
    'Webenze Labs',
    'Motion Graphics',
    'Motion Designer & UI Animator',
    'Motion showcase produk web interaktif dengan mockup device 3D halus, kinetic typography, dan animasi transisi responsif.',
    'Penyusunan video showreel peluncuran portofolio web interaktif untuk Webenze Labs. Menonjolkan kecepatan respons, keindahan layout UI/UX, dan kapabilitas interaktif website modern melalui koreografi mockup 3D sinkron.'
)
ON CONFLICT (id) DO NOTHING;

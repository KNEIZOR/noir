import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();

const directories = {
    gallery: path.join(ROOT, 'public', 'images', 'gallery'),
    menu: path.join(ROOT, 'public', 'images', 'menu'),
    backgrounds: path.join(ROOT, 'public', 'images', 'backgrounds'),
    dishes: path.join(ROOT, 'public', 'images', 'dishes'),
    temp: path.join(ROOT, 'public', 'images', '_source'),
};

const images = [
    {
        source: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=90',
        target: 'gallery/dining-room',
        width: 1800,
    },
    {
        source: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=90',
        target: 'gallery/table',
        width: 1400,
    },
    {
        source: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=90',
        target: 'gallery/evening-light',
        width: 1800,
    },
    {
        source: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=90',
        target: 'gallery/ambience',
        width: 1800,
    },
    {
        source: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=90',
        target: 'gallery/room',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=90',
        target: 'gallery/kitchen',
        width: 1600,
    },

    {
        source: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-01',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-02',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-03',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-04',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-05',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-06',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-07',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-08',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-09',
        width: 1600,
    },
    {
        source: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1800&q=90',
        target: 'menu/menu-10',
        width: 1600,
    },
];

async function ensureDirectories() {
    await Promise.all(
        Object.values(directories).map((directory) =>
            fs.mkdir(directory, { recursive: true }),
        ),
    );
}

async function downloadImage(url, destination) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Download failed: ${response.status} ${response.statusText}`,
        );
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    await fs.writeFile(destination, buffer);
}

async function convertToWebp(source, destination, width) {
    await sharp(source)
        .resize({
            width,
            withoutEnlargement: true,
        })
        .webp({
            quality: 82,
            effort: 5,
        })
        .toFile(destination);
}

async function processImage(image) {
    const sourceName = `${image.target.replace('/', '-')}.jpg`;

    const sourcePath = path.join(directories.temp, sourceName);

    const [folder, name] = image.target.split('/');

    const outputDirectory = directories[folder];

    if (!outputDirectory) {
        throw new Error(`Unknown output directory: ${folder}`);
    }

    const outputPath = path.join(outputDirectory, `${name}.webp`);

    console.log(`\nDownloading: ${image.target}`);

    await downloadImage(image.source, sourcePath);

    console.log(`Converting: ${name}.webp`);

    await convertToWebp(sourcePath, outputPath, image.width);

    const sourceStats = await fs.stat(sourcePath);
    const outputStats = await fs.stat(outputPath);

    console.log(
        `Done: ${(sourceStats.size / 1024 / 1024).toFixed(2)} MB -> ${(outputStats.size / 1024 / 1024).toFixed(2)} MB`,
    );
}

async function main() {
    console.log('NOIRÉ image migration');
    console.log('=====================');

    await ensureDirectories();

    for (const image of images) {
        try {
            await processImage(image);
        } catch (error) {
            console.error(`Failed: ${image.target}`);

            console.error(error);

            process.exitCode = 1;
        }
    }

    console.log('\nAll available external images processed.');
    console.log('eatclutch.com image was intentionally skipped.');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

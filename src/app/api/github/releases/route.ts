import { NextRequest, NextResponse } from 'next/server';

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: GitHubAsset[];
}

interface GitHubAsset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

export interface ReleaseInfo {
  version: string;
  releaseName: string;
  publishedAt: string;
  description: string;
  windowsDownloadUrl?: string;
  macDownloadUrl?: string;
  downloadCount: number;
}

export async function GET(request: NextRequest) {
  try {
    // Temporary hardcoded values for testing - replace with environment variables
    const owner = process.env.GITHUB_OWNER || 'thelokidev';
    const repo = process.env.GITHUB_REPO || 'maara-site';

    // Only show config error if truly not configured
    if (!owner || !repo || owner === 'your-github-username' || repo === 'your-repo-name') {
      return NextResponse.json(
        { error: 'GitHub repository not configured. Please set GITHUB_OWNER and GITHUB_REPO environment variables.' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Maara-Download-App',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          {
            error: 'No releases found. Please create your first release on GitHub.',
            repository: `https://github.com/${owner}/${repo}/releases`,
            instructions: 'Go to your repository releases page and create a new release with your installer files.'
          },
          { status: 404 }
        );
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const release: GitHubRelease = await response.json();

    // Find Windows and Mac installers
    const windowsAsset = release.assets.find(asset =>
      asset.name.toLowerCase().includes('windows') ||
      asset.name.toLowerCase().includes('.exe') ||
      asset.name.toLowerCase().includes('setup')
    );

    const macAsset = release.assets.find(asset =>
      asset.name.toLowerCase().includes('mac') ||
      asset.name.toLowerCase().includes('macos') ||
      asset.name.toLowerCase().includes('.dmg') ||
      asset.name.toLowerCase().includes('.pkg')
    );

    const releaseInfo: ReleaseInfo = {
      version: release.tag_name,
      releaseName: release.name,
      publishedAt: release.published_at,
      description: release.body,
      windowsDownloadUrl: windowsAsset?.browser_download_url,
      macDownloadUrl: macAsset?.browser_download_url,
      downloadCount: release.assets.reduce((sum, asset) => sum + asset.download_count, 0),
    };

    return NextResponse.json(releaseInfo);
  } catch (error) {
    console.error('Error fetching GitHub release:', error);
    return NextResponse.json(
      { error: 'Failed to fetch release information' },
      { status: 500 }
    );
  }
}

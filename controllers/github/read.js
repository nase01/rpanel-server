import fetch from "node-fetch";

const base_url = process.env.GITHUB_API_BASE_URL;
const access_token = process.env.GITHUB_ACCESS_TOKEN;
const owner = process.env.GITHUB_OWNER;

if (!access_token || !owner) {
  throw new Error("GITHUB_ACCESS_TOKEN or GITHUB_OWNER environment variable is not set.");
}

/**
 * Fetch the latest release from GitHub and return the tag name (e.g., v1.0.0).
 */
export const fetchLatest = async (req, res) => {
  try {
    const { repo } = req.params;

    if (!repo) {
      return res.status(400).json({
        errors: [{ status: "400", detail: "Missing 'repo' query parameter." }],
      });
    }

    const url = `${base_url}/${owner}/${repo}/releases/latest`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ errors: [{ status: `${response.status}`, detail: response.statusText }] });
    }

    const latestRelease = await response.json();
    return res.status(200).json({ data: latestRelease.tag_name });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ status: "500", detail: error.message || "Internal Server Error" }] });
  }
};

/**
 * Fetch all releases from GitHub and return an array of release notes details.
 * Supports optional filtering by tag.
 */
export const fetchReleases = async (req, res) => {
  try {
		const { repo} = req.params;
    const { tag } = req.query;

    if (!repo) {
      return res.status(400).json({
        errors: [{ status: "400", detail: "Missing 'repo' query parameter." }],
      });
    }

    const url = `${base_url}/${owner}/${repo}/releases`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ errors: [{ status: `${response.status}`, detail: response.statusText }] });
    }

    const releases = await response.json();

    // Filter releases by the provided tag (if any)
    const filteredReleases = tag
      ? releases.filter((release) => release.tag_name === tag)
      : releases;

    const releasesData = filteredReleases.map((release) => ({
      tag: release.tag_name,
      name: release.name,
      body: release.body,
      created_at: release.created_at,
      published_at: release.published_at,
    }));

    return res.status(200).json({ data: releasesData });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ status: "500", detail: error.message || "Internal Server Error" }] });
  }
};

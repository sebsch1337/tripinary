import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { getRandomPixabayImage } from "../../../services/pixabayService";

export default async function handler(req, res) {
	const session = await unstable_getServerSession(req, res, authOptions);
	if (!session) return res.status(401).json({ message: "unauthorized" });

	const {
		query: { q },
		method,
	} = req;

	if (!q) {
		return res.status(400).json({ error: "Query parameter is required" });
	}

	switch (method) {
		case "GET":
			try {
				const randomImage = await getRandomPixabayImage(q);
				return res.status(200).json(randomImage);
			} catch (error) {
				if (error.status) {
					return res.status(error.status).json({ message: error.message });
				}
				console.error(error.message);
				return res.status(500).json({ message: "internal server error" });
			}
			break;

		default:
			res.status(405).json({ error: "Method not allowed" });
			break;
	}
}

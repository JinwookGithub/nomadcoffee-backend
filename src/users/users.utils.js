import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
	try {
		// token이 없으면(req.headers.token으로 token이 안넘어오면 - 처음 계정생성시 로그인해도 토큰없음)
		if (!token) {
			return null;
		}
		const { id } = await jwt.verify(token, process.env.SECRET_KEY);
		const user = await client.user.findUnique({ where: { id } });
		if (user) {
			return user;
		} else {
			return null; // user 못찾으면 null
		}
	} catch {
		return null; // 에러발생시 null
	}
}; // getUser는 user 또는 null 리턴 -> resolver에서 null 처리 필요

export const protectedResolver =  //ourResolver를 실행할 함수
	(ourResolver) => (root, args, context, info) => {
		if (!context.loggedInUser) {
			return {
				ok: false,
				error: "Please log in to perform this action.",
			};
		}
		return ourResolver(root, args, context, info);
	};

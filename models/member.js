const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const member = {

    async join(data) {

        try {
            data.memPw = await bcrypt.hash(data.memPw, 10);
            delete data.memPwRe;

            const filePath = path.join(__dirname, "../data/member", data.memId + ".json");
            await fs.writeFile(filePath, JSON.stringify(data));

            return true; // 회원 가입 성공 
        } catch (err) {
            return false; // 회원 가입 실패 
        }
    },
    async login(memId, memPw, req) {
        try {
            const info = await this.get(memId);
            if (!info) {
                throw new Error("회원정보가 없습니다.");
            }

            const match = await bcrypt.compare(memPw, info.memPw);
            if (match) {
                req.session.memId = memId;
                return true;
            }

            throw new Error("비밀번호 일치 하지 않습니다.");
        } catch (err) {
            return false;
        }
    },
    /** 회원 정보 조회 */
    async get(memId) {
        try {
            const filePath = path.join(__dirname, "../data/member", memId + ".json");
            let data = await fs.readFile(filePath);


            data = JSON.parse(data.toString());

            return data;
        } catch (err) {
            return false;
        }
    }
};

module.exports = member;
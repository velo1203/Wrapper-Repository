class postRepoModel {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
    }

    validate() {
        if (!this.name || !this.description) {
            throw Error("name, description and userId are required");
        }
        // 폴더 이름으로 사용할 수 없는 문자와 한글을 제외하는 정규식
        const invalidCharsRegex = /[<>:"\/\\|?*\uAC00-\uD7A3]/;
        if (invalidCharsRegex.test(this.name)) {
            throw Error(
                "name contains invalid characters or Korean characters"
            );
        }

        return true;
    }
}

module.exports = { postRepoModel };

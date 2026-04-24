import React, { useEffect, useState } from 'react'

export default function CodilityTest() {
    const [users, setUsers] = useState([]);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [likes, setLikes] = useState(100);
    const [userLiked, setUserLiked] = useState(false);

    function generateEmails(users){
        let emails = [];
        let updatedUsers = users.map((row) => {
            const domain = `@${row?.company.toLowerCase()}.com`;
            const parts = row.name.split(' ');
            const firstName = parts[0];
            const lastName = parts[parts.length - 1];
            const middleInitial = parts.length > 2 ? parts[1][0] : '';

            let combinePart = (firstName[0] + (middleInitial || '') + lastName.replace('-', '')).toLowerCase();
            combinePart = combinePart.substring(0, 8);

            let email = `${combinePart}${domain}`;
            let count = emails.filter((item) => item === email).length;
            emails.push(email);
            if(count > 0){
                email = `${combinePart}${(count+1)}${domain}`;
            }
            return{
                ...row,
                email: email
            }
        });
        return updatedUsers;
    }

    function transaction(A, D){
        let total = 0;
        const negCount = Array(13).fill(0);

        for(let i = 0; i < A.length; i++){
            const amount = A[i];
            const date = D[i];
            total += amount;

            if(amount < 0){
                const month = parseInt(date.split("-")[1], 10);
                negCount[month]++;
            }
        }

        let feeMonths = 0;
        for(let m = 1; m <= 12; m++){
            if(negCount[m] < 3) {
                feeMonths++;
            }
        }

        console.log(total, negCount);
        return total - (feeMonths * 5);
    }

    function validatePhoneNumber(s){
        const pattern = /^\d{3}-\d{3}-\d{3}$/
        return pattern.test(s);
    }

    function validateName(name){
        var namePattern = /^[a-zA-Z\s-]+$/;
        if(!namePattern.test(name)){
            return false;
        }
        return true;
    }

    const handleLikes = () => {
        setLikes(userLiked ? (likes-1) : (likes+1) )
        setUserLiked(!userLiked);
    }

    const mergeIntervals = (intervals) => {
        let arr = intervals;
        arr.sort((a, b) => a[0] - b[0]);

        const res = [];
        res.push(arr[0]);

        for(let i = 1; i < arr.length; i++){
            const last = res[res.length - 1];
            const curr = arr[i];

            if(curr[0] <= last[1]){
                last[1] = Math.max(last[1], curr[1]);
            }else{
                res.push(curr);
            }
        }
        return res;
    }

    const lengthOfLongestSubstring = function (s) {
        let map = new Map();
        let left = 0;
        let maxLength = 0;

        for (let right = 0; right < s.length; right++) {
            const currentChar = s[right];

            // If the current character is already in the map and its index 
            // is within the current window (left <= map.get(currentChar)), 
            // move the left pointer to the position after the last occurrence.
            if (map.has(currentChar) && map.get(currentChar) >= left) {
                left = map.get(currentChar) + 1;
            }

            // Update the character's index in the map to its current position.
            map.set(currentChar, right);

            // Calculate the current window size (right - left + 1) and update the maximum length.
            maxLength = Math.max(maxLength, right - left + 1);
        }

        return maxLength;
    };

    useEffect(()=>{
        let userList = [
            { name: 'John Doe', company: 'infosys'},
            { name: 'Nane Kumar Singh', company: 'EY'},
            { name: 'Deepak Sinha', company: 'infosys'},
            { name: 'John Doe', company: 'EY'},
            { name: 'Manoj Malhotra', company: 'EY'},
            { name: 'Aniket Kumar Sharma', company: 'google'},
            { name: 'John Doe', company: 'infosys'},
        ];
        const users = generateEmails(userList);
        setUsers(users);

        let phoneNos = [
            { number: '123-234-345' },
            { number: '123-234-3456' }, 
            { number: '123-abc-345'}, 
            { number: '123--123-123'}
        ];

        let updatedPhoneNo = phoneNos.map((row)=> {
            let status = false;
            if(validatePhoneNumber(row.number)){
                status = true;
            }
            return {
                ...row,
                status
            }
        });
        setPhoneNumbers(updatedPhoneNo);

        const intervals = [[1,3], [2,6], [8,10], [15,18]];
        const merged = mergeIntervals(intervals);
        console.log('====mergeintervals', merged);


        const name = 'John';
        console.log(validateName(name),'====Name Validation');

        const string = 'abcabcd';
        console.log(lengthOfLongestSubstring(string),'String====');

        // let A = [180, -50, -25, -25];
        // let D = ["2020-01-01", "2020-01-01", "2020-01-01", "2020-01-31"];
        let A = [-60, 60, -40, -20];
        let D = ["2020-10-01", "2020-02-02", "2020-10-10", "2020-10-30"];
        console.log('====transactions',transaction(A, D));

        // let str = 'Hi Narendra. How are you bro?';
        // let str = 'Hi  Narendra.. Kaise ho . x x';
        // let str = 'Hello words! How are you doing today?. I am fine.'
        let str = 'Hello India! Kaise h aap sabhi? sab badiya.. koi dikkat??'
        console.log(findLongestString(str),'====findLongestString');


    },[]);

    function findLongestString(S){
        let str = S.replace(' ','').replace('!','.').replace('?','.').split('.');
        // let str = S.replace(' ','').split(/[.?!]+/);
        let maxLength = 0;
        console.log(str)
        for(let i = 0; i < str.length; i++){
            let chars = str[i].trim().split(' ');
            if(chars.length > maxLength){
                maxLength = chars.length;
            }
        }
        return maxLength;
    }

    return (
        <div>
            <hr/>
            <h4>Codility Test</h4>
            <div>
                <h5>Add emails of users</h5>
                <ul>
                    {
                        users?.map((row, index) => <li key={index}>{row.name} + {row.company} = {row.email}</li>)
                    }
                </ul>
            </div>
            <div>
                <h5>Validate Phone No.</h5>
                <ul>
                    {
                        phoneNumbers?.map((row, index) => <li key={index}>{row.number} - {row.status ? 'Validated Number' : 'Wrong'}</li>)
                    }
                </ul>
            </div>
            <div>
                <h5>Like Functionality</h5>
                <button onClick={handleLikes} className={userLiked ? 'liked like-button' : 'like-button'}>Like | <span className='likes-counter'>{likes}</span></button>
            </div>
            <div>
                <h5>Merge Interval</h5>
                
            </div>
            <hr/>
        </div>
    )
}

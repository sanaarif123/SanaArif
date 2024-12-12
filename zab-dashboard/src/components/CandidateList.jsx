import { Search } from 'lucide-react';


const candidates = [
  {
    id: 1,
    name: 'Hasan Tariq',
    email: 'htarikor@gmail.com',
    image: 'https://ik.imagekit.io/os33grffu/WhatsApp_Image_2024-03-28_at_9.51.58_PM-removebg-preview%20(2).png?updatedAt=1721845473127',
  },
  {
    id: 2,
    name: 'Moiz Shah',
    email: 'moiz.ali@example.com',
    image: 'https://ik.imagekit.io/os33grffu/66861052_2405291509738735_5006954951054721024_n.jpg?updatedAt=1724346573426',
  },
];

export function CandidateList() {
  return (
    <div className="mt-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4 space-y-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
            <img
              src={candidate.image}
              alt={candidate.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-medium">{candidate.name}</h3>
              <p className="text-sm text-gray-500">{candidate.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

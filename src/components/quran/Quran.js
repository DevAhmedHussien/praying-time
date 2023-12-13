import { useEffect, useState } from 'react'
import axios from 'axios'
import RecitersScreen from './RecitersScreen'
import PlayerScreen from './PlayerScreen'
import ChaptersScreen from './ChaptersScreen'

const Quran = () => {
  const [reciters, serReciters] = useState([])
  const [chapters, setChapters] = useState([])
  const [chapterDetail, setChapterDetail] = useState(null)
  const [reciterDetail, setReciterDetail] = useState(null)
  // Get All Reciters with Audio
  useEffect(() => {
    async function fetchData() {
      const {
        data: { reciters },
      } = await axios.get(`https://mp3quran.net/api/_english.php`)
      serReciters(reciters)
    }
    fetchData()
  }, [])
  // console.log('data',reciters)
  // Get All Chapters
  useEffect(() => {
    async function fetchData() {
      const {
        data: { chapters },
      } = await axios.get(`https://api.quran.com/api/v4/chapters`)
      // console.log(chapters)
      setChapters(chapters)
    }
    reciters && reciters.length > 0 && fetchData()
  }, [reciters])
  const reciterHandler = (reciter) => {
    setReciterDetail(reciter)
  }
  const chapterHandler = (chapter) => {
    setChapterDetail(chapter)
  }
  return (
    <div className='' style={{ width:'100%',display:'flex',justifyContent:'center',gap:50, flexWrap:'wrap'}}
    >
      <div className=''>
        <RecitersScreen reciters={reciters} reciterHandler={reciterHandler} />
      </div>
      <div className=' '>
        <ChaptersScreen chapters={chapters} chapterHandler={chapterHandler} />
      </div>
      <div className='col-lg-4 col-md-4 col-sm-12 col-12 '>
        <PlayerScreen
          reciterDetail={reciterDetail}
          chapterDetail={chapterDetail}
        />
      </div>
    </div>
  )
}

export default Quran
